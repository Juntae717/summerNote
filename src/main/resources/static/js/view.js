let idx = null; // 게시글 고유식별자
$(document).ready(function(){
    idx = $('#idx').val();
    if(idx == null) location.replace("/");

    $('#idx').remove();
    let param = {
        idx: idx
    };

    /**
     * FUNCTION :: 게시글 상세 조회 기능
     */
    $.ajax({
        type: "POST",
        url: "/select.do",
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

/**
 * FUNCTION :: 게시글 목록 페이지 이동
 */
const moveNotice = function() {
    location.href = "/";
};

/**
 * FUNCTION :: 게시글 삭제 이후 게시글 목록 페이지 이동
 */
const deleteNotice = function() {
    let param = {
        idx: idx
    };

    $.ajax({
        type: "POST",
        url: "/view/delete.do",
        data: param,
        success: function(res) {
            location.replace("/");
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
            alert("통신 실패");
        }
    });
};

/**
 * FUNCTION :: 게시글 수정 페이지 이동(idx 값 전달)
 */
const moveForm = function() {
    location.href = "/form?idx=" + idx;
};