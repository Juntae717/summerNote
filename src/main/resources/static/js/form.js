let idx = null; // 게시글 고유식별자

/**
 * FUNCTION :: editor 이미지 업로드 기능 커스텀
 * @param files
 * @param editor
 */
const uploadSummernoteImageFile = function(files, editor) {
    const filesArray = Array.from(files);
    filesArray.forEach(file => {
        let data = new FormData();
        data.append("file", file);
        $.ajax({
            type: "POST",
            url: "/uploadSummernoteImageFile",
            data: data,
            contentType : false,
            processData : false,
            success: function(res) {
                $(editor).summernote('insertImage', res.url);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                alert("통신 실패");
            }
        });
    });
};


$(document).ready(function(){
    idx = $('#idx').val();
    $('#idx').remove();

    /**
     * FUNCTION :: editor custom settings
     */
    $('.summernote').summernote({
        width: 1100,
        height: 800,
        lang: "ko-KR",
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
        fontSizes: ['8','9','10','11','12','13','14','16','18','20','24','30','36'],
        callbacks: {
            onImageUpload : function(files) {
                uploadSummernoteImageFile(files, this);
            },
        }
    });

    if(idx == "") return false;

    let param = {
        idx: idx
    };

    /**
     * FUNCTION :: parameter 값 idx가 있는 경우 수정하기 위하여 게시글 데이터를 받아옴.
     */
    $.ajax({
        type: "POST",
        url: "/select.do",
        data: param,
        success: function(res) {
            $('#notice_title').val(res.title);
            $('.note-editable').html(res.content);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
            alert("통신 실패");
        }
    });
});

/**
 * FUNCTION :: 게시글 등록
 * @returns {boolean}
 */
const insertNotice = function() {
    let param = {
        title: $('#notice_title').val(),
        content: $('.note-editable').html()
    };

    if(param.title == "") {
        alert("제목이 입력되지 않았습니다.");
        $('#notice_title').focus();
        return false;
    }

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

/**
 * FUNCTION :: 게시글 수정
 * @returns {boolean}
 */
const updateNotice = function() {
    let param = {
        idx: idx,
        title: $('#notice_title').val(),
        content: $('.note-editable').html()
    };

    if(param.title == "") {
        alert("제목이 입력되지 않았습니다.");
        $('#notice_title').focus();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/form/update.do",
        data: param,
        success: function(res) {
            location.replace("/view?idx=" + idx);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
            alert("통신 실패");
        }
    });
};

/**
 * FUNCTION :: 게시글 상세조회 페이지 이동
 */
const moveView = function() {
    location.href = "/view?idx=" + idx;
};

/**
 * FUNCTION :: 게시글 목록 페이지 이동
 */
const moveNotice = function() {
    location.href = "/";
};