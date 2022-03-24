const HOST_URL = "http://101.200.61.174:8080/";
// const HOST_URL = "http://localhost:8080/";
let image_len = 0;

$(
    function () {
        //获取参数信息
        let href = decodeURI(window.location.href);
        // console.log(href)
        if (href.lastIndexOf("?") > 0) {
            let url = href.substring(href.lastIndexOf("?") + 1);
            if (url.length > 0) {
                $("#u2_input").attr("value", url)
                addinfo_2(url);
                while (image_len > 0) {
                    //设置点击放大
                    layer.photos({
                        photos: '#image-' + --image_len
                        , anim: 5//0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                    });
                }
            }
        }
    }
)

function addinfo_2(title) {
    layui.use('table', function () {
        let table = layui.table;
        table.render({
            elem: '#table-1'
            , url: HOST_URL + "/document/search/" + title
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                {type: 'checkbox', width: 40,}
                , {
                    field: 'name',
                    title: '文物名称',
                    align: 'center',
                    templet: '<div data-id="{{d.id}}" > <a data-id="{{d.id}}"  target="_blank" href="' + HOST_URL + 'pages/detail.html?{{d.id}}"><p>{{d.name}}</p></a></div>'
                } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , {field: 'number', title: '文物编号', sort: true, align: 'center'}
                , {field: 'info', title: '考古信息摘要（前10字)', align: 'center'}
                , {field: 'chemicalComposition', title: '化学组成（前10字', align: 'center'}
                , {
                    field: 'image',
                    title: '文物照片（缩略图)',
                    align: 'center',
                    templet: '<div><div id="image-{{d.id}}"><img  src="{{d.image}}" alt="点击放大"></div></div>'
                } //单元格内容水平居右
            ]]
            , page: true
            , response: {
                statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
            }
            , parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.message, //解析提示文本
                    "count": res.data.length, //解析数据长度
                    "data": getass(res)  //解析数据列表
                }
                    ;
            }
        });
        layer.photos({
            photos: '#image-0'
            , anim: 5//0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });
    });
}

function toDetail(e) {
    console.log(e)
    window.open(HOST_URL + "pages/detail.html?" + $(this).attr("data-id"));
}

function getass(res) {
    let data = res.data;
    let id = 0;
    for (let d of data) {
        // d.image = "<img src='" + HOST_URL + "file/image/onload/" + d.image.substring(6) + "'"
        d.image = HOST_URL + "file/onload/image/" + d.image.substring(6)
        d.id = id++;
    }
    image_len = id;
    return data;
}

function addaInfo(list) {
    console.log(list)
    let tbody = $("#result-tbody");
    tbody.empty();
    for (let l of list) {
        let $tr = $("<tr></tr>");
        let imageId = l.image.substring(6);
        let $check = $("<input type='checkbox'  name='compare' class='checkbox' data-id='" + l.id + "' >");
        $tr.append($("<td></td>").append($check));
        let $name = $("<td id='" + l.id + "' >" + l.name + "</td>");
        $name.click(function () {
            window.open(HOST_URL + "pages/detail.html?" + l.id);
        })
        $tr.append($name)
        $tr.append("<td>" + l.number + "</td>")
        $tr.append("<td>" + l.info + "</td>")
        $tr.append("<td>" + l.chemicalComposition + "</td>")
        $tr.append("<td>" + "<img  src='" + HOST_URL + "/file/onload/image/" + imageId + "' >" + "</td>")
        tbody.append($tr);
    }
}

function search() {
    let val = $("#u2_input").val();
    addinfo_2(val);
    while (image_len > 0) {
        //设置点击放大
        layer.photos({
            photos: '#image-' + --image_len
            , anim: 5//0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });
        console.log(image_len)
    }
}

function compare() {
    let checkbox = $(".layui-table-main").find(".layui-form-checked");
    console.log(checkbox.length)
    if (checkbox.length !== 2) {
        alert("只能比较两组")
        return;
    }

    console.log($(checkbox[0]).parent().parent().next().children("div").children('a').attr("data-id"))
    let id1 = $(checkbox[0]).parent().parent().next().children("div").children('a').attr("data-id");
    let id2 = $(checkbox[1]).parent().parent().next().children("div").children('a').attr("data-id");
    window.open(HOST_URL + "pages/compare.html?" + id1 + "&" + id2);
}