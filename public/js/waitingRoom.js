
const span1 = document.querySelector(".span1")
const span2 = document.querySelector(".span2")
const span3 = document.querySelector(".span3")

span1.addEventListener("animationend", () => {
    span1.classList.remove("waiting-loader");
    span2.classList.add("waiting-loader");
})
span2.addEventListener("animationend", () => {
    span2.classList.remove("waiting-loader");
    span3.classList.add("waiting-loader");
})
span3.addEventListener("animationend", () => {
    span3.classList.remove("waiting-loader");
    span1.classList.add("waiting-loader");
})