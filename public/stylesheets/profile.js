var elements = document.getElementsByClassName("Pending");
for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "รออนุมัติ";
}
var elements = document.getElementsByClassName("Finish");
for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "สำเร็จ";
}
var elements = document.getElementsByClassName("Cancel");
for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "ยกเลิก";
}