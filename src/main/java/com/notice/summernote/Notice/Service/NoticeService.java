package com.notice.summernote.Notice.Service;

import com.notice.summernote.database.mybatis.dto.NoticeDTO;
import com.notice.summernote.database.mybatis.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeMapper noticeMapper;

    public String Notice(Model model, NoticeDTO noticeDTO) {
        model.addAttribute("noticeList", noticeMapper.selectNotice(noticeDTO));
        return "/notice";
    }

    public String NoticeForm() {
        return "/form";
    }

    public String NoticeInsert(NoticeDTO noticeDTO) {
        noticeMapper.insertNotice(noticeDTO);

        return "success";
    }

    public String NoticeView() { return "/view"; }

    public NoticeDTO NoticeViewSelect(NoticeDTO noticeDTO) {
        return noticeMapper.selectNoticeView(noticeDTO);
    }
}
