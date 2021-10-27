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
    <!-- Jquery&Bootstrap -->
    <script src="/resources/js/jquery/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/jquery-ui-1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!--  -->

    <title>Title</title>
</head>
<body>
<header>
    <div style="width: 1200px; margin: 0 auto 10px; border-bottom: 1px solid #6c757d;" class="header-container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">게시판</a>
        </nav>
    </div>
</header>
<div style="width: 1100px; margin: 0 auto;" class="notice-container">
    <ul class="list-group">
        <c:forEach var="notice" items="${noticeList}" varStatus="status">
            <li class="list-group-item"><a href="/view?idx=${notice.idx}">${notice.title}</a></li>
        </c:forEach>
    </ul>
    <div style="margin-top: 5px;" class="text-right">
        <button style="padding: 10px 40px;" class="btn btn-primary" onClick="moveForm();">글쓰기</button>
    </div>
</div>
<script>
    const moveForm = function() {
        location.href = "/form";
    };
</script>
</body>
</html>
