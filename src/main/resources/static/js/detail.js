const HOST_URL = "http://localhost:8080/document/get/";
$(
    function () {
        //获取参数信息
        let href = window.location.href;
        let id = href.substring(href.lastIndexOf("?") + 1);
        //简略
        //详细
        $.get(HOST_URL + id, function (res) {
            console.log(res);
            let infomes = res.data.info;
            let detailmes = res.data.document;
            let info = $("#document-info");

            let detail = $("#document-detail");

        })
    }
)