//初始化
$(function () {
    $("img").click(add);
    // $('button').click(postSubmit)
})

function add() {
    let name = prompt("请选择分类信息(新增分类:1,文本信息:2,csv文件:3,图片:4)");
    if (name == null) {
        return;
    }
    switch (name) {
        case "1":
            addMessage(this);
            break;
        case "2":
            addTxt(this);
            break;
        case "3":
            addCsv(this)
            break;
        case "4":
            addImage(this)
            break;
        default:
            alert("选择错误");
    }
}

//添加信息
function addMessage(e) {
    let name = prompt("请输入分类名");
    let $e = $(e);
    let $ul = $('<ul class="folder" ></ul>');
    let $li = $('<li class="folder" ></li>');
    let $img = $('<img src="../img/add.png">');
    $img.click(add);
    $li.append('<i>' + name + '</i>').append($img)
    $e.after($ul.append($li))
}

//添加文本
function addTxt(e) {
    let $e = $(e);
    let name = prompt("请输入描述");
    let i = $('<i class="txt" ></i>').text(name)
    let input = $("<input type='text' placeholder='请输入信息'>");
    let li = $("<li></li>").append(i).append(input)
    $e.after($('<ul class="txt"></ul>').html(li))
}

//添加文件
function addCsv(e) {
    let $e = $(e);
    let name = prompt("请输入描述");
    let i = $('<i class="file" data-upload="false"></i>').text(name)
    let input = $("<input type='file' accept='text/csv'>");
    let button = $("<button>上传</button>");
    //添加点击事件
    button.click(uploadCsv);
    let li = $("<li ></li>").append(i).append(input).append(button);
    $e.after($('<ul class="file" data-upload="false"></ul>').html(li))
}

//添加图片
function addImage(e) {
    let $e = $(e);
    let name = prompt("请输入描述");
    let i = $('<i ></i>').text(name)
    let input = $("<input type='file' accept='image/*'>");
    let button = $("<button>上传</button>");
    //添加点击事件
    button.click(uploadImage);
    let li = $('<li></li>').append(i).append(input).append(button);
    $e.after($('<ul class="file" data-upload="false"></ul>').html(li))
}

//提交文章
function postSubmit() {
    //检查文件是否上传
    if (!checkUpload()) {
        alert("有文件未上传,上传后再提交");
        return;
    }
    //提交
    let json = {}
    json["文物信息"] = getJson($("#document-part-1"));
    json["环境信息"] = getJson($("#document-part-2"));
    json["病害信息与劣化参数"] = getJson($("#document-part-3"));
    json["保护方案"] = getJson($("#document-part-4"));
    let form = {
        document: json
    }
    console.log(form)
    $.ajax({
        url: "http://localhost:8080/document/submit",
        type: 'post',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(form),
        success: function (res) {
            //提交简略信息
            $("#info-id").attr("value", res.data);
            console.log(res)
            $("#document-info").children("form").submit();

        }
    });

    console.log(json);
}

/**
 * 检查文件是否提交
 * @returns {boolean}
 */
function checkUpload() {
    let ul = $("ul.file");
    for (let e of ul) {
        let $e = $(e);
        let attr = $e.attr("data-upload");
        if (attr === "false") {
            return false;
        }
    }
    return true;
}

/**
 * 获取全部信息
 * @param $ul
 * @returns {{}}
 */
function getJson($ul) {
    let json = {};
    let children = $ul.children("li").children("ul");
    for (let child of children) {
        let $c = $(child);
        let type = $c.attr("class");
        if (type === "folder") {
            let c = $c.children("li");
            let name = c.children("i").text()
            json[name] = getJson(c.children("ul"));
        } else if (type === "txt") {
            let c = $c.children("li");
            let name = c.children("i").text()
            json[name] = c.children("input").val();
        } else if (type === "file") {
            let c = $c.children("li");
            let name = c.children("i").text()
            json[name] = $c.attr("data-id");
        }
    }
    return json;
}

/**
 * 上传csv
 * @param e
 */
function uploadCsv() {
    let prev = $(this).prev();
    let formData = new FormData();
    formData.append("csv", prev[0].files[0]);
    $.ajax({
        url: 'http://localhost:8080/file/upload/csv',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {
        console.log(res)
        let parent = prev.parent().parent();
        parent.attr("data-id", res.data)
        //修改状态
        parent.attr("data-upload", "true")
    });
}

/**
 * 上传image
 * @param e
 */
function uploadImage() {
    let prev = $(this).prev();
    let formData = new FormData();
    formData.append("image", prev[0].files[0]);
    $.ajax({
        url: 'http://localhost:8080/file/upload/image',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {
        console.log(res)
        let parent = prev.parent().parent();
        parent.attr("data-id", res.data)
        //修改状态
        parent.attr("data-upload", "true")
    });


}

function uploading() {
    let formData = new FormData();
    let $image = $('#image-input');

    formData.append("image", $image[0].files[0]);
    $.ajax({
        url: 'http://localhost:8080/file/upload/image',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {
        $('#image-id').attr("value", res.data)
    });
}