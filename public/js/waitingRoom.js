
const circle1 = document.querySelector(".span1")
const circle2 = document.querySelector(".span2")
const circle3 = document.querySelector(".span3")

circle1.addEventListener("animationend", () => {
    circle1.classList.remove("waiting-loader");
    circle2.classList.add("waiting-loader");
})
circle2.addEventListener("animationend", () => {
    circle2.classList.remove("waiting-loader");
    circle3.classList.add("waiting-loader");
})
circle3.addEventListener("animationend", () => {
    circle3.classList.remove("waiting-loader");
    circle1.classList.add("waiting-loader");
})