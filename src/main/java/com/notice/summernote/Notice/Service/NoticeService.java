package com.notice.summernote.Notice.Service;

import com.notice.summernote.database.mybatis.dto.FileDTO;
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
import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

        String fileRoot = "D:\\summernote_image\\"; // 이미지 파일 저장할 경로
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
            FileUtils.deleteQuietly(targetFile); // 파일 제거
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
            FileInputStream fis = new FileInputStream("D:\\summernote_image\\" + filename); // 리소스 파일을 읽어옴

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
     * @param multipartFileList
     * @param noticeDTO
     * @param fileDTO
     * @return
     */
    @Transactional
    public String NoticeInsert(List<MultipartFile> multipartFileList, NoticeDTO noticeDTO, FileDTO fileDTO) {
        noticeMapper.insertNotice(noticeDTO);
        uploadFile(multipartFileList, fileDTO);
        return "success";
    }

    public String uploadFile(List<MultipartFile> multipartFileList, FileDTO fileDTO) {
        try {
            if(multipartFileList.size() > 0 && !multipartFileList.get(0).getOriginalFilename().equals("")) {
                int fileIndex = 1;
                String fileRoot = "D:\\summernote_file\\"; // 이미지 파일 저장할 경로
                fileDTO.setPath(fileRoot);
                for(MultipartFile file: multipartFileList) {
                    String originalFileName = file.getOriginalFilename(); // 파일의 원래 이름
                    String extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 파일의 확장자

                    String uuid = UUID.randomUUID().toString();
                    String savedFileName = uuid + extension; // 저장할 파일 이름 랜덤 생성

                    File targetFile = new File(fileRoot + savedFileName); // 파일 객체 생성
                    try{
                        InputStream fileStream = file.getInputStream(); // 파일을 읽을 객체 생성
                        FileUtils.copyInputStreamToFile(fileStream, targetFile); // 파일 저장
                        switch (fileIndex) {
                            case 1:
                                fileDTO.setName1(originalFileName);
                                fileDTO.setUuid1(uuid);
                                fileDTO.setSize1((int) file.getSize());
                                fileDTO.setExt1(extension);
                                break;
                            case 2:
                                fileDTO.setName2(originalFileName);
                                fileDTO.setUuid2(uuid);
                                fileDTO.setSize2((int) file.getSize());
                                fileDTO.setExt2(extension);
                                break;
                            case 3:
                                fileDTO.setName3(originalFileName);
                                fileDTO.setUuid3(uuid);
                                fileDTO.setSize3((int) file.getSize());
                                fileDTO.setExt3(extension);
                                break;
                            case 4:
                                fileDTO.setName4(originalFileName);
                                fileDTO.setUuid4(uuid);
                                fileDTO.setSize4((int) file.getSize());
                                fileDTO.setExt4(extension);
                                break;
                            case 5:
                                fileDTO.setName5(originalFileName);
                                fileDTO.setUuid5(uuid);
                                fileDTO.setSize5((int) file.getSize());
                                fileDTO.setExt5(extension);
                                break;
                            default: break;
                        }
                        fileIndex++;
                    } catch (IOException e) {
                        FileUtils.deleteQuietly(targetFile); // 파일 제거
                        e.printStackTrace();
                    }
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            noticeMapper.uploadFile(fileDTO);
            return "success";
        }
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

    public FileDTO getFile(int noticeIdx) {
        FileDTO fileDTO = new FileDTO();
        fileDTO.setNotice_idx(noticeIdx);
        return noticeMapper.selectFile(fileDTO);
    }

    /**
     * FUNCTION :: 게시글 삭제 기능
     * @param noticeDTO
     * @return
     */
    @Transactional
    public String NoticeDelete(NoticeDTO noticeDTO) {
        FileDTO fileDTO = new FileDTO();
        fileDTO.setNotice_idx(noticeDTO.getIdx());
        noticeMapper.deleteFile(fileDTO);

        noticeMapper.deleteNotice(noticeDTO);

        return "success";
    }
}
