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
        },
        disableDragAndDrop: true
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
            let notice_info = res;
            $.ajax({
                type: "POST",
                url: "/getFile.do",
                data: param,
                success: function(res) {
                    $('#notice_title').val(notice_info.title);
                    $('.note-editable').html(notice_info.content);

                    res.forEach(item => {
                        if(typeof item.name == "undefined") return;
                        filesArr.push({
                            name: item.name,
                            uuid: item.uuid,
                            size: item.size,
                            ext: item.ext,
                            is_delete: false
                        });
                        fileCnt++;

                        $('#upload-file-list').append('<li id="file_' + fileNum + '" class="file-list-item" draggable="true">'
                            +item.name+ '<span style="padding: 0 5px; color: #aaa;">'+formatFileSize(item.size)
                            +'</span><span id="del-btn" onclick="fileDelete('+ fileNum +')">─</span></li>');
                        fileNum++;
                    });
                    addEventsDragAndDrop();
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

/**
 * FUNCTION :: 파일 탐색
 */
const openFileExplorer = function() {
    $('#notice_file').click();
};

let fileCnt = 0; // 현재 필드 파일 개수
let maxFileCnt = 5; // 필드 최대 파일 개수
let fileExpText = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
let maxFileSize = 10 * 1024 * 1024; // 파일 최대 사이즈
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
        if(!file.name.match(fileExpText)) { // 이미지 파일 유효성 검사
            alert(file.name+" - 허용되지 않은 파일 유형입니다.");
            fileCnt--;
            return;
        } else if(file.size > maxFileSize) { // 이미지 파일 크기 검사
            alert(file.name+" - 파일 크기가 10MB를 초과했습니다.");
            fileCnt--;
            return;
        }

        let reader = new FileReader();

        reader.onload = function() {
            filesArr.push(file);
            $('#upload-file-list').append('<li id="file_' + fileNum + '" class="file-list-item" draggable="true">'
                +file.name+ '<span style="padding: 0 5px; color: #aaa;">'+formatFileSize(file.size)
                +'</span><span id="del-btn" onclick="fileDelete('+ fileNum +')">─</span></li>');
            fileNum++;
            addEventsDragAndDrop();
        };
        reader.readAsDataURL(file);
    });


    $('#notice_file').val("");
};

let dragSrcEl;

const dragStart = function(element) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    element.dataTransfer.effectAllowed = 'move';
    element.dataTransfer.setData('id', this.id);
    element.dataTransfer.setData('text/html', this.innerHTML);
};

const dragEnter = function(element) {

};

const dragOver = function(element) {
    element.preventDefault();
    element.dataTransfer.dropEffect = 'move';
    return false;
};

const dragLeave = function(element) {
    element.stopPropagation();
};

const dragDrop = function(element) {
    if (dragSrcEl != this) {
        dragSrcEl.id = this.id;
        dragSrcEl.innerHTML = this.innerHTML;
        this.id = element.dataTransfer.getData('id');
        this.innerHTML = element.dataTransfer.getData('text/html');
    }
    return false;
};

const dragEnd = function(element) {
    let listItems =  document.querySelectorAll(".file-list-item");
    [].forEach.call(listItems, item =>{
        item.classList.remove('over');
    });
    this.style.opacity = '1';
};

function addEventsDragAndDrop() {
    let listItems =  document.querySelectorAll(".file-list-item");
    [].forEach.call(listItems, item =>{
        item.addEventListener('dragstart', dragStart, false);
        item.addEventListener('dragenter', dragEnter, false);
        item.addEventListener('dragover', dragOver, false);
        item.addEventListener('dragleave', dragLeave, false);
        item.addEventListener('drop', dragDrop, false);
        item.addEventListener('dragend', dragEnd, false);
    });
};

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
const insertNotice = function() {
    if($('#notice_title').val() == "") {
        alert("제목이 입력되지 않았습니다.");
        $('#notice_title').focus();
        return false;
    }
    let formData = new FormData();

    formData.append("title", $('#notice_title').val());
    formData.append("content", $('.note-editable').html());

    let listItems =  document.querySelectorAll(".file-list-item");
    [].forEach.call(listItems, item => {
        let file = filesArr[item.id.substr(5)];
        formData.append("article_file", file);
    });

    formData.append("maxFileCnt", maxFileCnt.toString());

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
    if($('#notice_title').val() == "") {
        alert("제목이 입력되지 않았습니다.");
        $('#notice_title').focus();
        return false;
    }

    let itemIndex = 1;
    let orderArr = [];
    let formData = new FormData();
    let listItems =  document.querySelectorAll(".file-list-item");
    [].forEach.call(listItems, item => {
        let file = filesArr[item.id.substr(5)];
        if(typeof file.uuid != "undefined") {
            formData.append("nameList", file.name);
            formData.append("uuidList", file.uuid);
            formData.append("sizeList", file.size);
            formData.append("extList", file.ext);
            itemIndex++;
        } else {
            formData.append("article_file", file);
            orderArr.push(itemIndex);
            itemIndex++;
        }
    });

    for(let i = 1; i <= listItems.length; i++) {
        if (orderArr.indexOf(i) == -1) {
            orderArr.push(i);
        }
    }

    [].forEach.call(orderArr, order => {
        formData.append("orderList", order);
    });

    formData.append("idx", idx);
    formData.append("title", $('#notice_title').val());
    formData.append("content", $('.note-editable').html());

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/form/update.do",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            location.replace("/view?idx=" + idx);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
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