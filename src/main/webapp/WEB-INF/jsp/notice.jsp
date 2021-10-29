<%--
  Created by IntelliJ IDEA.
  User: zhdh1
  Date: 2021-10-26
  Time: 오후 4:53
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
    <link rel="stylesheet" type="text/css" href="/resources/css/notice.css"/>
    <!--  -->

    <!-- Jquery&Bootstrap -->
    <script src="/resources/js/jquery/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/jquery-ui-1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!--  -->

    <!-- JavaScript -->
    <script type="text/javascript" src="/resources/js/notice.js"></script>
    <!--  -->
    <title>Summernote</title>
</head>
<body>
<!-- header 영역 -->
<header>
    <div class="header-container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">게시판</a>
        </nav>
    </div>
</header>
<!-- content 영역 -->
<div class="notice-container">
    <!-- 글 목록 -->
    <ul class="list-group">
        <c:forEach var="notice" items="${noticeList}" varStatus="status">
            <li class="list-group-item"><a href="/view?idx=${notice.idx}">${notice.title}</a></li>
        </c:forEach>
    </ul>
    <!-- 버튼 영역 -->
    <div style="margin-top: 5px;" class="text-right">
        <button class="btn btn-primary" onClick="moveForm();">글쓰기</button>
    </div>
</div>
</body>
</html>
