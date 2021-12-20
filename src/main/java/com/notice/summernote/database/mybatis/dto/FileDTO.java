package com.notice.summernote.database.mybatis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDTO {
    int idx; // 고유식별자
    
    // 기존 파일명
    String name1;
    String name2;
    String name3;
    String name4;
    String name5;
    
    String path; // 파일 저장 경로
    
    int notice_idx; // 첨부파일을 올릴 게시판 식별자
    
    // 저장될 파일명
    String uuid1;
    String uuid2;
    String uuid3;
    String uuid4;
    String uuid5;
    
    // 파일 크기
    int size1;
    int size2;
    int size3;
    int size4;
    int size5;
    
    // 파일 확장명
    String ext1;
    String ext2;
    String ext3;
    String ext4;
    String ext5;
}
