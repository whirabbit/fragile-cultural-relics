const HOST_URL = "http://localhost:8080/";
$(
    function () {
        //获取参数信息
        let href = window.location.href;
        // console.log(href
        if (href.lastIndexOf("?") > 0) {
            let url = href.substring(href.lastIndexOf("?") + 1);
            if (url.length > 0) {
                console.log(url)
                $.get(HOST_URL + "/document/search/" + url, function (response) {
                    console.log(response)
                    //添加数据
                    addaInfo(response.data);
                })
            }
        }
    }
)

function addaInfo(list) {
    console.log(list)
    let tbody = $("#result-tbody");
    for (let l of list) {
        let $tr = $("<tr></tr>");
        let imageId = l.image.substring(6);
        $tr.append("<td>" + "选择" + "</td>")
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
    $.get(HOST_URL + "/document/search/" + val, function (response) {
        console.log(response)
        //添加数据
        addaInfo(response.data);
    })
}