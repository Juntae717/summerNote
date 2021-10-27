package com.notice.summernote.Notice.Controller;

import com.notice.summernote.Notice.Service.NoticeService;
import com.notice.summernote.database.mybatis.dto.NoticeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    @RequestMapping("/")
    public String Notice(Model model, NoticeDTO noticeDTO) { return noticeService.Notice(model, noticeDTO); }

    @RequestMapping("/form")
    public String NoticeForm() { return noticeService.NoticeForm(); }

    @PostMapping("/form/insert.do")
    @ResponseBody
    public String NoticeInsert(NoticeDTO noticeDTO) { return noticeService.NoticeInsert(noticeDTO); }

    @RequestMapping("/view")
    public String NoticeView() { return noticeService.NoticeView(); }

    @PostMapping("/view/select.do")
    @ResponseBody
    public NoticeDTO NoticeViewSelect(NoticeDTO noticeDTO) { return noticeService.NoticeViewSelect(noticeDTO); }
}
