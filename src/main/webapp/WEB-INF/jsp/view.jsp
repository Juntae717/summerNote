<%--
  Created by IntelliJ IDEA.
  User: zhdh1
  Date: 2021-10-26
  Time: 오후 5:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="e" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <!-- Css -->
    <link rel="stylesheet" type="text/css" href="/resources/css/view.css"/>
    <!--  -->

    <!-- Jquery&Bootstrap -->
    <script src="/resources/js/jquery/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/jquery-ui-1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!--  -->

    <!-- JavaScript -->
    <script type="text/javascript" src="/resources/js/view.js"></script>
    <!--  -->
    <title>Summernote</title>
</head>
<body>
<!-- header 영역 -->
<header>
    <div class="header-container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">게시판 조회</a>
        </nav>
    </div>
</header>
<!-- content 영역 -->
<div class="notice-container">
    <!-- 게시글 고유식별자 -->
    <input id="idx" type="hidden" value="${param.idx}">
    <!-- 게시글 상세 조회 영역 -->
    <ul class="list-group">
        <li class="list-group-item">
            <span id="notice_title"></span>
        </li>
        <li class="list-group-item">
            <div id="notice_content">

            </div>
        </li>
    </ul>
    <!-- 버튼 영역 -->
    <div id="btn-area" class="text-right">
        <button class="btn btn-secondary" onClick="moveNotice();">뒤로가기</button>
        <button class="btn btn-danger" onClick="deleteNotice();">삭제</button>
        <button class="btn btn-primary" onClick="moveForm();">수정</button>
    </div>
</div>
</body>
</html>
