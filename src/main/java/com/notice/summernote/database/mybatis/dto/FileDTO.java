package com.notice.summernote.database.mybatis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDTO {
    int idx; // 고유식별자

    String ref_name; // 첨부파일을 올릴 참조할 테이블 명칭
    int ref_idx; // 첨부파일을 올릴 컬럼 식별자
    
    int file_order; // 파일 정렬 순서
    
    String path; // 파일 저장 경로
    String name; // 기존 파일명
    String uuid; // 저장될 파일명
    int size; // 파일 크기
    String ext; // 파일 확장명
}
