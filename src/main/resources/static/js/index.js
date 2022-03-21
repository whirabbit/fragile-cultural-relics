// const HOST_URL = "http://localhost:8080/pages/";
const HOST_URL = "http://101.200.61.174:8080/pages/";

function search() {
    let val = $("#u2_input").val();
    location.replace(HOST_URL + "result.html?" + val);
}

function toAdd() {
    open(HOST_URL + "add.html")
}