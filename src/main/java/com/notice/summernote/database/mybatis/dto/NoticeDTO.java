package com.notice.summernote.database.mybatis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NoticeDTO {
    private int idx; // 게시글 고유식별자
    private String title; // 게시글 제목
    private String content; // 게시글 내용
}
