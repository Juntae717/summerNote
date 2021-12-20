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
 * FUNCTION :: 파일 탐색
 */
const openFileExplorer = function() {
    $('#notice_file').click();
};

let fileCnt = 0; // 현재 필드 파일 개수
let maxFileCnt = 5; // 필드 최대 파일 개수
let fileNum = 0; // 파일 식별 번호
let filesArr = new Array(); // 첨부파일 배열

/**
 * FUNCTION :: 파일 선택 시 파일 개수 확인 및 목록 추가
 * @param element
 */
const fileCheck = function(element) {
    let files = element.files;
    let tempArr = Array.from(files);

    if(fileCnt + tempArr.length > maxFileCnt) {
        alert("파일은 최대 " + maxFileCnt + "개까지 업로드 할 수 있습니다.");
        $('#notice_file').val("");
        return;
    } else {
        fileCnt = fileCnt + tempArr.length;
    }

    tempArr.forEach(file => {
        if(!(file.size > (10 * 1024 * 1024))) {
            let reader = new FileReader();

            let fmt_size = "";
            if (file.size > (1024 * 1024)) {
                fmt_size = (file.size / 1024 / 1024).toFixed(2) + 'MB';
            } else if (file.size > (1024)) {
                fmt_size = (file.size / 1024).toFixed(2) + 'KB';
            } else {
                fmt_size = (file.size).toFixed(2) + 'B';
            }

            reader.onload = function() {
                filesArr.push(file);
                $('#upload-file-list').append('<div id="file_' + fileNum + '" class="file-list-item">'
                    +file.name+ '<span style="padding: 0 5px; color: #aaa;">'+fmt_size+'</span><span id="del-btn" onclick="fileDelete('+ fileNum +')">─</span></div>');
                fileNum++;
            };
            reader.readAsDataURL(file);
        } else {
            fileCnt--;
            alert(file.name + " 파일 용량이 10MB를 초과하였습니다.");
        }
    });
    $('#notice_file').val("");
};

/**
 * FUNCTION :: 파일 삭제
 * @param fileNum
 */
const fileDelete = function(fileNum) {
    filesArr[fileNum].is_delete = true;
    $('#file_' + fileNum).remove();
    fileCnt--;
};

/**
 * FUNCTION :: 게시글 등록
 * @returns {boolean}
 */
// const insertNotice = function() {
//     let param = {
//         title: $('#notice_title').val(),
//         content: $('.note-editable').html()
//     };
//     if(param.title == "") {
//         alert("제목이 입력되지 않았습니다.");
//         $('#notice_title').focus();
//         return false;
//     }
//
//     $.ajax({
//         type: "POST",
//         enctype: "multipart/form-data",
//         url: "/form/insert.do",
//         data: param,
//         success: function(res) {
//             let formData = new FormData();
//             for(let i = 0; i < filesArr.length; i++) {
//                 if(!filesArr[i].is_delete) {
//                     formData.append("article_file", filesArr[i]);
//                 }
//             }
//
//             $.ajax({
//                 type: "POST",
//                 enctype: "multipart/form-data",
//                 url: "/form/uploadFile.do",
//                 data: formData,
//                 processData: false,
//                 contentType: false,
//                 success: function (res) {
//                     location.replace("/");
//                 },
//                 error: function (XMLHttpRequest, textStatus, errorThrown) { // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
//                     alert("통신 실패");
//                 }
//             });
//         },
//         error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
//             alert("통신 실패");
//         }
//     });
// };

const insertNotice = function() {
    let formData = new FormData();

    for(let i = 0; i < filesArr.length; i++) {
        if(!filesArr[i].is_delete) {
            formData.append("article_file", filesArr[i]);
        }
    }

    formData.append("title", $('#notice_title').val());
    formData.append("content", $('.note-editable').html());

    if(formData.title == "") {
        alert("제목이 입력되지 않았습니다.");
        $('#notice_title').focus();
        return false;
    }

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/form/insert.do",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            location.replace("/");
            },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
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