const HOST_URL = "http://101.200.61.174:8080/";
$(
    function () {
        //获取参数信息
        let href = decodeURI(window.location.href);
        // console.log(href)
        if (href.lastIndexOf("?") > 0) {
            let url = href.substring(href.lastIndexOf("?") + 1);
            if (url.length > 0) {
                $("#u2_input").attr("value",url)
                $.get(HOST_URL + "/document/search/" + url, function (response) {
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
    $.get(HOST_URL + "/document/search/" + val, function (response) {
        console.log(response)
        //添加数据
        addaInfo(response.data);
    })
}

function compare() {
    let checkbox = $("input[name='compare']:checked");
    if (checkbox.length !== 2) {
        alert("只能比较两组")
        return;
    }
    let id1 = $(checkbox[0]).attr("data-id");
    let id2 = $(checkbox[1]).attr("data-id");
    window.open(HOST_URL + "pages/compare.html?" + id1 + "&" + id2);
}