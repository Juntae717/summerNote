package com.notice.summernote.Notice.Controller;

import com.google.gson.JsonObject;
import com.notice.summernote.Notice.Service.NoticeService;
import com.notice.summernote.database.mybatis.dto.FileDTO;
import com.notice.summernote.database.mybatis.dto.NoticeDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    /**
     * FUNCTION :: "/" URL로 클라이언트에서 접근시 noticeService Method Notice 호출
     * @param model
     * @param noticeDTO
     * @return
     */
    @RequestMapping("/")
    public String Notice(Model model, NoticeDTO noticeDTO) { return noticeService.Notice(model, noticeDTO); }

    /**
     * FUNCTION :: "/form" URL로 클라이언트에서 접근시 NoticeService Method NoticeForm 호출
     * @return
     */
    @RequestMapping("/form")
    public String NoticeForm() { return noticeService.NoticeForm(); }

    /**
     * FUNCTION :: "/uploadSummernoteImageFile" URL로 클라이언트에서 접근시 NoticeService Method uploadSummernoteImageFile 호출
     * @param multipartFile
     * @return
     */
    @PostMapping("/uploadSummernoteImageFile")
    @ResponseBody
    public JsonObject uploadSummernoteImageFile(@RequestParam("file") MultipartFile multipartFile) { return noticeService.uploadSummernoteImageFile(multipartFile); }

    /**
     * FUNCTION :: "summernoteImage" URL로 클라이언트에서 접근시 NoticeService Method displayImage 호출
     * @param response
     * @param filename
     * @return
     */
    @RequestMapping("/summernoteImage")
    public String displayImage(HttpServletResponse response, @RequestParam(value = "filename") String filename) { return noticeService.displayImage(response, filename); };

    /**
     * FUNCTION :: "/form/insert.do" URL로 클라이언트에서 POST 형식으로 접근시 NoticeService Method NoticeInsert 호출
     * @param noticeDTO
     * @return
     */
    @PostMapping("/form/insert.do")
    @ResponseBody
    public String NoticeInsert(@RequestParam(value = "article_file", required = false) List<MultipartFile> multipartFileList, NoticeDTO noticeDTO, FileDTO fileDTO) { return noticeService.NoticeInsert(multipartFileList, noticeDTO, fileDTO); }

    /**
     * FUNCTION :: "/form/update.do" URL로 클라이언트에서 POST 형식으로 접근시 NoticeService Method NoticeUpdate 호출
     * @param noticeDTO
     * @return
     */
    @PostMapping("/form/update.do")
    @ResponseBody
    public String NoticeUpdate(NoticeDTO noticeDTO) { return noticeService.NoticeUpdate(noticeDTO); }

    /**
     * FUNCTION :: "/view" URL로 클라이언트에서 접근시 NoticeService Method NoticeView 호출
     * @return
     */
    @RequestMapping("/view")
    public String NoticeView() { return noticeService.NoticeView(); }

    /**
     * FUNCTION :: "/select.do" URL로 클라이언트에서 POST 형식으로 접근시 NoticeService Method NoticeSelect 호출
     * @param noticeDTO
     * @return
     */
    @PostMapping("/select.do")
    @ResponseBody
    public NoticeDTO NoticeViewSelect(NoticeDTO noticeDTO) { return noticeService.NoticeSelect(noticeDTO); }

    @PostMapping("/getFile.do")
    @ResponseBody
    public FileDTO getFile(@RequestParam("idx") int noticeIdx) { return noticeService.getFile(noticeIdx); }

    /**
     * FUNCTION :: "/view/delete.do" URL로 클라이언트에서 POST 형식으로 접근시 NoticeService Method NoticeDelete 호출
     * @param noticeDTO
     * @return
     */
    @PostMapping("/view/delete.do")
    @ResponseBody
    public String NoticeDelete(NoticeDTO noticeDTO) { return noticeService.NoticeDelete(noticeDTO); }
}