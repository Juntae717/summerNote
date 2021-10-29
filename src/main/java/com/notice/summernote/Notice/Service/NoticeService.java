package com.notice.summernote.Notice.Service;

import com.notice.summernote.database.mybatis.dto.NoticeDTO;
import com.notice.summernote.database.mybatis.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;

import com.google.gson.JsonObject;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeMapper noticeMapper;

    /**
     * FUNCTION :: 게시글 전체 목록 불러오고 notice.jsp 반환
     * @param model
     * @param noticeDTO
     * @return
     */
    public String Notice(Model model, NoticeDTO noticeDTO) {
        model.addAttribute("noticeList", noticeMapper.selectAllNotice(noticeDTO));
        return "/notice";
    }

    /**
     * FUNCTION :: form.jsp 반환
     * @return
     */
    public String NoticeForm() {
        return "/form";
    }

    /**
     * FUNCTION :: form.jsp에서 이미지 불러올시 해당 이미지 외부 경로로 저장(editor image upload custom)
     * @param multipartFile
     * @return
     */
    public JsonObject uploadSummernoteImageFile(MultipartFile multipartFile) {
        JsonObject jsonObject = new JsonObject(); // 클라이언트에 반환할 JSON 객체 생성

        String fileRoot = "C:\\summernote_image\\"; // 이미지 파일 저장할 경로
        String originalFileName = multipartFile.getOriginalFilename(); // 파일의 원래 이름
        String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일의 확장자

        String savedFileName = UUID.randomUUID() + extension; // 저장할 파일 이름 랜덤 생성

        File targetFile = new File(fileRoot + savedFileName); // 파일 객체 생성

        try {
            InputStream fileStream = multipartFile.getInputStream(); // 파일을 읽을 객체 생성
            FileUtils.copyInputStreamToFile(fileStream, targetFile); // 파일 저장
            jsonObject.addProperty("url", "/summernoteImage?filename="+savedFileName);
            jsonObject.addProperty("responseCode", "success");
        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile); // 파일 생성
            jsonObject.addProperty("responseCode", "error");
            e.printStackTrace();
        }

        return jsonObject;
    }

    /**
     * FUNCTION :: 외부 경로에 있는 이미지 파일을 읽어온 후 해당 URL에 이미지 출력
     * @param response
     * @param filename
     * @return
     */
    public String displayImage(HttpServletResponse response, String filename) {

        response.setContentType("image/jpg"); // 클라이언트로 보낼 컨텐츠 타입 지정
        try {
            ServletOutputStream bout = response.getOutputStream(); // 파일을 출력할 객체 생성
            FileInputStream fis = new FileInputStream("C:\\summernote_image\\" + filename); // 리소스 파일을 읽어옴

            /**
             * LINE :: Byte 형태로 불러온 파일을 OutputStream을 통해 출력
             */
            int length;
            byte[] buffer = new byte[1024];
            while((length = fis.read(buffer)) != -1){
                bout.write(buffer,0,length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * FUNCTION :: 게시글 등록 기능
     * @param noticeDTO
     * @return
     */
    public String NoticeInsert(NoticeDTO noticeDTO) {
        noticeMapper.insertNotice(noticeDTO);

        return "success";
    }

    /**
     * FUNCTION :: 게시글 수정 기능
     * @param noticeDTO
     * @return
     */
    public String NoticeUpdate(NoticeDTO noticeDTO) {
        noticeMapper.updateNotice(noticeDTO);

        return "success";
    }

    /**
     * FUNCTION :: view.jsp 반환
     * @return
     */
    public String NoticeView() { return "/view"; }

    /**
     * FUNCTION :: 게시글 상세 조회 데이터 반환
     * @param noticeDTO
     * @return
     */
    public NoticeDTO NoticeSelect(NoticeDTO noticeDTO) {
        return noticeMapper.selectNotice(noticeDTO);
    }

    /**
     * FUNCTION :: 게시글 삭제 기능
     * @param noticeDTO
     * @return
     */
    public String NoticeDelete(NoticeDTO noticeDTO) {
        noticeMapper.deleteNotice(noticeDTO);
        return "success";
    }
}
