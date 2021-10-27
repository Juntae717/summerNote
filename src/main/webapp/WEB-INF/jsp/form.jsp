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
    <title>Title</title>
</head>
<body>
<header>
<div style="width: 1200px; margin: 0 auto 10px; border-bottom: 1px solid #6c757d;" class="header-container">
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">게시판 등록</a>
    </nav>
</div>
</header>
<div style="width: 1100px; margin: 0 auto;" class="notice-container">
    <div class="form-group">
        <label for="notice_title">제목</label>
        <input type="title" class="form-control" id="notice_title" placeholder="Enter title">
    </div>
    <div>
        <label for="notice_content">내용</label>
        <textarea id="notice_content" class="summernote"></textarea>
    </div>
    <div style="margin-top: 5px;" class="text-right">
        <button style="padding: 10px 40px;" class="pull-right btn btn-secondary" onClick="moveForm();">취소</button>
        <button style="padding: 10px 40px;" class="btn btn-primary" onClick="insertNotice();">등록</button>
    </div>
</div>
<script>
    $('.summernote').summernote({
        width: 1100,
        height: 800,
        lang: "ko-KR",
        placeholder: 'Enter Contents',
        toolbar: [
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['color', ['forecolor','color']],
            ['table', ['table']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['picture','link','video']]
        ],
        fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체'],
        fontSizes: ['8','9','10','11','12','13','14','16','18','20','24','30','36']
    });

    const insertNotice = function() {
        let param = {
            title: $('#notice_title').val(),
            content: $('.note-editable').html()
        };

        $.ajax({
            type: "POST",
            url: "/form/insert.do",
            data: param,
            success: function(res) {
                location.replace("/");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("통신 실패");
            }
        });
    };

    const moveForm = function() {
        location.href = "/";
    };
</script>
</body>
</html>
