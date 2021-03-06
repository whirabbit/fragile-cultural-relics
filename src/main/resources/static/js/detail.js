const documentURL = "http://101.200.61.174:8080/document/get/";
const IMG_URL = "http://101.200.61.174:8080/file/";
// const documentURL = "http://localhost:8080/document/get/";
// const IMG_URL = "http://localosh:8080/file/";
let image_num = 0;
//递归chengshu
let digui = 0;
$(
    function () {
        //获取参数信息
        let href = window.location.href;
        let id = href.substring(href.lastIndexOf("?") + 1);
        //简略
        //详细
        $.get(documentURL + id, function (res) {
            let infomes = res.data.info;
            let document = res.data.document.document;
            let info = $("#document-info");
            console.log(infomes)
            $("#info-name").append(infomes.name);
            $("#info-number").append(infomes.number);
            $("#info-info").append(infomes.info);
            $("#info-ch").append(infomes.chemicalComposition);
            $("#info-image").append("<div id='image-" + image_num + "'> <img class='image-small' src='" + IMG_URL + "onload/image/" + infomes.image.substring(6) + "' alt'点击放大'></div>"
            )
            layer.photos({
                photos: '#image-' + image_num++
                , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
            });
            console.log(document)
            addMess($("#li-1"), document)
            let detail = $("#document-detail");

        })
    }
)

function addMess(liEle, json) {
    digui++;
    for (let key in json) {
        let $ul = $("<ul></ul>");
        let $li = $("<li></li>");
        console.log(digui)
        if (digui === 1) {
            $li.append("<h1>" + key + ":"+ "</h1>")
        } else {
            $li.append("<h2>" + key + "</h2>")
        }
        $ul.append($li);
        liEle.append($ul);
        if (typeof json[key] != 'string') {
            addMess($li, json[key])
        } else {
            //检查类型
            let index = json[key].indexOf(':');
            if (index === 5) {
                $li.append("<div id='image-" + image_num + "' ><img class='image-small' src='" + IMG_URL + "onload/image/" + json[key].substring(6) + "' alt='点击放大'></div>")
                //图片
                layer.photos({
                    photos: '#image-' + image_num++
                    , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                });
            } else if (index === 3) {
                //csv
                let table = $("<table></table>");

                $li.append(table)
                $.get(IMG_URL + "onload/csv/" + json[key].substring(4), function (res) {
                    console.log(res)
                    showCsv(res, table)
                })
            } else {
                $li.append(json[key])
            }

        }
    }
    digui--;
}

function JSONLength(obj) {
    let size = 0;
    for (let key in obj) {   //obj中存在几个关键字
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
}

function showCsv(txt, demo) {
//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
//wb.Sheets[Sheet名]获取第一个Sheet的数据
    let strings = txt.split("\n");
    console.log(strings);
    let keyAry = strings[0].split(",")
    console.log(keyAry);
    let data = [];
    for (let i = 1; i < strings.length; i++) {
        data[i - 1] = strings[i].split(",")
    }
    console.log(data)
// 清除上次渲染的表格
    demo.empty();
// 设置表格头
    let tr0 = $("<tr></tr>");
    for (let key of keyAry) {
        tr0.append(`<th>${key}</th>`)
    }
    $(`<thead></thead>`).append(tr0).appendTo(demo);
    for (let d of data) {
        // 通过循环,每有一条数据添加一行表格
        let tr = $("<tr></tr>");
        for (let n = 0; n < keyAry.length; n++) {
            // 根据keyAry数组的长度,创建每一行表格中的td
            $("<td></td>").addClass(keyAry[n]).appendTo(tr);
        }
        // 遍历对象,根据键名找到是哪一列的数据,给对应的td添加内容
        for (let k in d) {
            // (tr[0].children[keyAry.indexOf(k)])
            $(tr[0].children[k]).html(d[k]);
        }
        tr.appendTo(demo);
    }
}