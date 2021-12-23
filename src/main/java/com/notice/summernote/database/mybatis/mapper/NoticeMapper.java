package com.notice.summernote.database.mybatis.mapper;

import com.notice.summernote.database.mybatis.dto.FileDTO;
import com.notice.summernote.database.mybatis.dto.NoticeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.io.File;
import java.util.List;

@Mapper
public interface NoticeMapper {
    /**
     * FUNCTION :: 게시글 등록 기능
     * @param noticeDTO
     */
    void insertNotice(NoticeDTO noticeDTO);

    void insertFile(FileDTO fileDTO);

    /**
     * FUNCTION :: 게시글 수정 기능
     * @param noticeDTO
     */
    void updateNotice(NoticeDTO noticeDTO);

    void resetFile(FileDTO fileDTO);
    void updateFile(FileDTO fileDTO);

    /**
     * FUNTION :: 게시글 전체 목록 불러오기 기능
     * @param noticeDTO
     * @return
     */
    List<NoticeDTO> selectAllNotice(NoticeDTO noticeDTO);

    /**
     * FUNCTION :: 게시글 상세 조회 기능
     * @param noticeDTO
     * @return
     */
    NoticeDTO selectNotice(NoticeDTO noticeDTO);

    List<FileDTO> selectFile(FileDTO fileDTO);

    /**
     * FUNCTION :: 게시글 삭제 기능
     * @param noticeDTO
     */
    void deleteNotice(NoticeDTO noticeDTO);

    void deleteFile(FileDTO fileDTO);
}
