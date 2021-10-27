package com.notice.summernote.database.mybatis.mapper;

import com.notice.summernote.database.mybatis.dto.NoticeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    void insertNotice(NoticeDTO noticeDTO);
    List<NoticeDTO> selectNotice(NoticeDTO noticeDTO);
    NoticeDTO selectNoticeView(NoticeDTO noticeDTO);
}
