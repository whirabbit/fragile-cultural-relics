// const HOST_URL = "http://localhost:8080/";
const HOST_URL = "http://101.200.61.174:8080/";
let button_num = 4;
let input_num = 0;
//初始化
$(function () {
    bindDropdown("document-part-button-0");
    bindDropdown("document-part-button-1");
    bindDropdown("document-part-button-2");
    bindDropdown("document-part-button-3");
    bindUpload("test1")
})

//绑定下拉菜单
function bindDropdown(id) {
    layui.use('dropdown', function () {
        let dropdown = layui.dropdown
        dropdown.render({
            elem: '#' + id
            , trigger: 'hover'
            , data: [{
                title: '添加子项'
                , id: 100
            }, {
                title: '添加文本'
                , id: 101
            }, {
                title: '添加csv文件'
                , id: 102
            }, {
                title: '添加图片'
                , id: 103
            }]
            , click: function (data, othis) {

                var elem = $(this.elem);
                let listId = elem.data('id'); //表格列表的预埋数据
                //   layer.msg('得到表格列表的 id：' + listId + '，下拉菜单 id：' + data.id);
                switch (data.id) {
                    case 100:
                        addMessage(id);
                        break;
                    case 101:
                        addTxt(id);
                        break;
                    case 102:
                        addCsv(id)
                        break;
                    case 103:
                        addImage(id)
                        break;
                    default:
                        alert("选择错误");
                }
            }
        });
    });
}

//绑定上传
function bindUpload(id) {
    let upload = layui.upload; //得到 upload 对象
    //创建一个上传组件
    upload.render({
        elem: '#' + id
        , url: HOST_URL + 'file/upload/image'
        , before: function () {
            //删除之前的图片
            let attr = $('#image-id').attr("value");
            if (attr !== "empty") {
                $.get(HOST_URL + "file/delete/image/" + attr.substring(6), function (res) {
                });
            }
        }
        , done: function (res, index, upload) { //上传后的回调
            if (res.code === 200) {
                layer.msg("图片上传成功");
            }
            $('#image-id').attr("value", res.data)
            // $('#test1').attr("class", "layui-btn layui-btn-xs layui-btn-disabled");
            // $("#info-button").attr("class", "layui-btn layui-btn-xs layui-btn-disabled");
        }
        , accept: 'images' //允许上传的文件类型
        , acceptMime: 'image/*'
        , auto: true
        , bindAction: "#info-button"
    })
}

function bindImage(id) {
    let upload = layui.upload; //得到 upload 对象
    //创建一个上传组件
    upload.render({
        elem: '#input-' + id
        , url: HOST_URL + 'file/upload/image'
        , before: function () {
            //删除之前文件
            let attr = $("#input-" + id).parent().parent().attr("data-id");
            if (attr === undefined) {
                return;
            }
            console.log(attr)
            if (attr.indexOf(":") === 5) {
                $.get(HOST_URL + "file/delete/image/" + attr.substring(6), function (res) {
                    console.log("删除")
                    console.log(res);
                });
            }
        }
        , done: function (res, index, upload) { //上传后的回调
            if (res.code === 200) {
                layer.msg("图片上传成功");
            } else {
                layer.msg("图片上传失败");
            }
            let prev = $("#input-" + id);
            let parent = prev.parent().parent();
            parent.attr("data-id", res.data)
            //修改状态
            parent.attr("data-upload", "true")
            $('#image-id').attr("value", res.data)
        }
        , accept: 'images' //允许上传的文件类型
        , acceptMime: 'image/*'
        , auto: false
        , bindAction: "#input-button-" + id
    })
}

function bindCsv(id) {
    let upload = layui.upload; //得到 upload 对象
    //创建一个上传组件
    upload.render({
        elem: '#input-' + id
        , url: HOST_URL + 'file/upload/csv'
        , before: function () {
            //删除之前文件
            let attr = $("#input-" + id).parent().parent().attr("data-id");
            if (attr === undefined) {
                return;
            }
            console.log(attr)
            if (attr.indexOf(":") === 3) {
                $.get(HOST_URL + "file/delete/csv/" + attr.substring(4), function (res) {
                    console.log("删除")
                    console.log(res);
                });
            }
        }
        , done: function (res, index, upload) {
            if (res.code === 200) {
                layer.msg("csv上传成功");
            } else {
                layer.msg("csv上传失败");
            }
            let prev = $("#input-" + id);
            let parent = prev.parent().parent();
            parent.attr("data-id", res.data)
            //修改状态
            parent.attr("data-upload", "true")
            $('#image-id').attr("value", res.data)
        }
        , accept: 'text' //允许上传的文件类型
        , acceptMime: 'text/csv'
        , auto: false
        , bindAction: "#input-button-" + id
    })
}

//添加信息
function addMessage(e) {
    let name = prompt("请输入分类名");
    let $e = $("#" + e);
    let $ul = $('<ul class="folder" ></ul>');
    let $li = $('<li class="folder" ></li>');
    let $img = $('<button class="layui-btn layui-btn-xs layui-btn-normal" id="document-part-button-' + button_num + '" >添加</button>');
    bindDropdown("document-part-button-" + button_num);
    button_num++;
    $li.append('<i>' + name + '</i>').append($img)
    $e.after($ul.append($li))
}

//添加文本
function addTxt(e) {
    let $e = $("#" + e);
    let name = prompt("请输入描述");
    let i = $('<i class="txt" ></i>').text(name)
    let input = $("<input class='layui-input' type='text' placeholder='请输入信息'>");
    let li = $("<li></li>").append(i).append(input)
    $e.after($('<ul class="txt"></ul>').html(li))
}

//添加文件
function addCsv(e) {
    let $e = $("#" + e);
    let name = prompt("请输入描述");
    let i = $('<i class="file" data-upload="false"></i>').text(name)
    let input = $('<button type="button" class="layui-btn layui-btn-normal layui-btn-xs" id="input-' + input_num + '">' +
        '    <i class="layui-icon">&#xe67c;</i>上传csv' +
        '</button>')
    let button = $('<button id="input-button-' + input_num + '"  class="layui-btn layui-btn-normal layui-btn-xs"  > 提交</button>')

    let li = $("<li ></li>").append(i).append(input).append(button);
    $e.after($('<ul class="file" data-upload="false"></ul>').html(li))
    bindCsv(input_num);
    input_num++;
}

//添加图片
function addImage(e) {
    let $e = $("#" + e);
    let name = prompt("请输入描述");
    let i = $('<i ></i>').text(name)
    let input = $('<button type="button" class="layui-btn layui-btn-normal layui-btn-xs" id="input-' + input_num + '">' +
        '    <i class="layui-icon">&#xe67c;</i>上传图片' +
        '</button>')
    let button = $('<button id="input-button-' + input_num + '"  class="layui-btn layui-btn-normal layui-btn-xs"  > 提交</button>')

    let li = $('<li></li>').append(i).append(input).append(button);
    $e.after($('<ul class="file" data-upload="false"></ul>').html(li))
    bindImage(input_num);
    input_num++;
}

//提交文章
function postSubmit() {
    //检查文件是否上传
    if (!checkUpload()) {
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
    $.ajax({
        url: HOST_URL + "document/submit",
        type: 'post',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(form),
        success: function (res) {
            //提交简略信息
            $("#info-id").attr("value", res.data);
            console.log(res)
            let info = {
                name: $("#info-name").val(),
                id: res.data,
                number: $("#info-number").val(),
                info: $("#info-info").val(),
                chemicalComposition: $("#info-chemicalComposition").val(),
                image: $("#image-id").val()
            }
            console.log(info)
            $.ajax({
                    url: HOST_URL + "document/submitInfo",
                    type: 'post',
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(info),
                    success: function (res) {
                        //打开新窗户
                        let b = confirm("已经提交,是否继续");
                        if (b)
                            location.reload();
                        else
                            location.replace(HOST_URL);
                    }
                }
            );

            $(this).children("button").attr("disabled", true)

        }
    });

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
            layer.msg("有文件未上传,请上传后再提交");
            return false;
        }
    }
    let input = $("input:text")
    for (let put of input) {
        if ($(put).val().length === 0) {
            layer.msg("摘要信息不能为空");
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
    console.log($ul)
    let json = {};
    let children = $ul.children("li").children("ul");
    for (let child of children) {
        let $c = $(child);
        let type = $c.attr("class");
        if (type === "folder") {
            let c = $c.children("li");
            let name = c.children("i").text()
            console.log(name + "-------")
            json[name] = getJson($c);
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
    let $this = $(this);
    let prev = $this.prev();
    let formData = new FormData();
    formData.append("file", prev[0].files[0]);
    $.ajax({
        url: HOST_URL + 'file/upload/csv',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {
        console.log(res)
        $this.attr("disabled", true);
        $this.css("background-color", "rgba(211,207,207,0.44)")
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
    let $this = $(this);
    let prev = $this.prev();
    let formData = new FormData();
    formData.append("file", prev[0].files[0]);
    $.ajax({
        url: HOST_URL + 'file/upload/image',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {
        console.log(res)
        $this.attr("disabled", true);
        $this.css("background-color", "rgba(211,207,207,0.44)")
        let parent = prev.parent().parent();
        parent.attr("data-id", res.data)
        //修改状态
        parent.attr("data-upload", "true")
    });


}

function uploading() {
    let formData = new FormData();
    let $image = $('#image-input');

    if ($image[0].files[0] == null) {
        layer.msg("未选择图片");
    }
    formData.append("file", $image[0].files[0]);
    $.ajax({
        url: HOST_URL + 'file/upload/image',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            $('#image-id').attr("value", res.data)
            $("#info-button").attr("disabled", true);
            //         $("#info-button").css("background-color", "rgba(211,207,207,0.44)")
        }
    });
}