const HOST_URL = "http://localhost:8080/";

function search() {
    let val = $("#u2_input").val();
    location.replace(HOST_URL + "pages/result.html?" + val);
}