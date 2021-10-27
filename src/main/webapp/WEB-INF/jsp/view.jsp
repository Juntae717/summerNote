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
            <a class="navbar-brand" href="#">게시판 조회</a>
        </nav>
    </div>
</header>
<div style="width: 1100px; margin: 0 auto;" class="notice-container">
    <input id="idx" type="hidden" value="<%= request.getParameter("idx")%>>">
    <ul class="list-group">
        <li class="list-group-item">
            <span id="notice_title"></span>
        </li>
        <li class="list-group-item">
            <div id="notice_content">

            </div>
        </li>
    </ul>
    <div style="margin-top: 5px;" class="text-right">
        <button style="padding: 10px 40px;" class="btn btn-secondary" onClick="moveForm();">뒤로가기</button>
        <button style="padding: 10px 40px;" class="btn btn-danger" onClick="">삭제</button>
        <button style="padding: 10px 40px;" class="btn btn-primary" onClick="">수정</button>
    </div>
</div>
<script>
    let idx = null;
    $(document).ready(function(){
        idx = $('#idx').val();
        if(idx == null) location.replace("/");

        $('#idx').remove();
        let param = {
            idx: idx
        };

        $.ajax({
            type: "POST",
            url: "/view/select.do",
            data: param,
            success: function(res) {
                $('#notice_title').html(res.title);
                $('#notice_content').html(res.content);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("통신 실패");
            }
        });
    });
</script>
</body>
</html>
