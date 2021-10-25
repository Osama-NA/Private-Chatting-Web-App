const menuText = document.querySelector(".menu p");

//JQuery Function That Hides And Displays Side Bar Navigation
$(".burger").click(function (e) {
  const style = getComputedStyle(menuText);
  const getDisplayStyle = style.display;
  if (getDisplayStyle === "inline") {
    if (screen.width <= 767) {
      $(".menu").css("padding", "8.3rem 1.1rem");
      $(".nav").css("min-width", "55px");
      $(".nav").css("max-width", "55px");
      $(".menu i").css("padding-bottom", "0.5rem");

      $(".content").css("display", "flex");
    } else {
      $(".menu").css("padding", "10.2rem 1.9rem");
      $(".nav").animate({ minWidth: "85px" });
      $(".nav").animate({ maxWidth: "85px" });
      $(".menu i").css("padding-bottom", "1rem");
    }
    $(".menu p").hide();
    $(".footer span").hide();
    $(".footer #footer-text").hide();
    $(".logo img").hide();
  } else {
    if (screen.width <= 767) {
      $(".menu").css("padding", "0rem 1.1rem");
      $(".content").css("display", "none");
    } else {
      $(".menu").css("padding", "0rem 1.9rem");
    }
    $(".nav").animate({ minWidth: "270px" });
    $(".nav").animate({ maxWidth: "270px" });
    $("p").css("display", "inline");
    $(".footer span").css("display", "inline");
    $(".logo img").show();
  }
});
