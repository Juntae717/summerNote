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
            let notice_info = res;
            $.ajax({
                type: "POST",
                url: "/getFile.do",
                data: param,
                success: function(res) {
                    $('#notice_title').html(notice_info.title);
                    $('#notice_content').html(notice_info.content);

                    res.forEach(item => {
                        if(typeof item.name == "undefined") return;
                        $("#file-list").css("display", "block");
                        $("#file-list-area").append('<li class="file-list-item">'+ item.name+
                            '<span style="padding: 0 5px; color: #aaa;">'+ formatFileSize(item.size) +'</span></li>');
                    });
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                    alert("통신 실패");
                }
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
            alert("통신 실패");
        }
    });
});

const formatFileSize = function(fileSize) {
    let fmt_size = "";

    if (fileSize > (1024 * 1024)) {
        fmt_size = (fileSize / 1024 / 1024).toFixed(2) + 'MB';
    } else if (fileSize > (1024)) {
        fmt_size = (fileSize / 1024).toFixed(2) + 'KB';
    } else {
        fmt_size = (fileSize).toFixed(2) + 'B';
    }

    return fmt_size;
};

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