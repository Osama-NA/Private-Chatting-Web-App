const burger= document.querySelector('.burger');
const menu= document.querySelector('.nav');

burger.onclick= displayMenu;

//Function Which Hides And Displays Navigation Menu
function displayMenu(){
    const style = getComputedStyle(menu); 
    const getDisplayStyle= style.display;
    if(getDisplayStyle === "block"){
        menu.style.display= "none";
    }
    else{
        menu.style.display= "block";
    }
}