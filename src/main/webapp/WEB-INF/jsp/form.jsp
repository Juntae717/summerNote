<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: zhdh1
  Date: 2021-10-26
  Time: 오후 2:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="/resources/css/form.css"/>
    <!--  -->

    <!-- Jquery&Bootstrap -->
    <script src="/resources/js/jquery/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/jquery-ui-1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!--  -->

    <!-- Summernote -->
    <script src="/resources/summernote/summernote-lite.js"></script>
    <script src="/resources/summernote/lang/summernote-ko-KR.js"></script>
    <link rel="stylesheet" href="/resources/summernote/summernote-lite.css">
    <!--  -->

    <!-- JavaScript -->
    <script type="text/javascript" src="/resources/js/form.js"></script>
    <!-- -->
    <title>Summernote</title>
</head>
<body>
<!-- header 영역 -->
<header>
<div class="header-container">
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">게시판 등록</a>
    </nav>
</div>
</header>
<!-- 컨텐츠 영역 -->
<div class="notice-container">
    <!-- 게시글 고유식별자 -->
    <input id="idx" type="hidden" value="${param.idx}">
    <!-- form title 영역 -->
    <div class="form-group">
        <span style="display: inline-block; padding: 5px 0;">제목</span>
        <input type="title" class="form-control" id="notice_title" placeholder="Enter title">
    </div>
    <!-- form file 영역 -->
    <div class="form-group">
        <span style="display: inline-block; padding: 5px 0;">첨부파일</span><br>
        <input type="button" value="파일 추가" onclick="openFileExplorer()"/>
        <span style="display: inline-block; padding: 0 5px;">※첨부파일은 최대 5개까지 등록이 가능합니다.</span>
        <input style="display: none;" id="notice_file" type="file" accept="image/*" multiple="multiple" onchange="fileCheck(this)"/>
        <ul style="overflow: hidden" id="upload-file-list">

        </ul>
    </div>
    <!-- form content 영역 -->
    <div>
        <span style="display: inline-block; padding: 5px 0;">내용</span>
        <textarea id="notice_content" class="summernote"></textarea>
    </div>
    <!-- form button 영역 -->
    <div id="form-btn-area" class="text-right">
        <c:choose>
            <c:when test="${param.idx != null}">
                <button class="pull-right btn btn-secondary" onClick="moveView();">취소</button>
                <button class="btn btn-primary" onClick="updateNotice();">수정</button>
            </c:when>
            <c:otherwise>
                <button class="pull-right btn btn-secondary" onClick="moveNotice();">취소</button>
                <button class="btn btn-primary" onClick="insertNotice();">등록</button>
            </c:otherwise>
        </c:choose>
    </div>
</div>
</body>
</html>