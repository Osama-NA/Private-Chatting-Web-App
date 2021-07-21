const close= document.getElementById("close");
const open= document.querySelector("#report-bug a");
const form= document.querySelector(".report-form");
close.onclick= closeForm;
open.onclick= openForm;

function closeForm(){
    form.style.display= "none";
}

function openForm(){
    form.style.display= "flex";
}