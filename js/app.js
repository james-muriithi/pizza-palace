

// UI Logic
const nav = $("nav");

$(function () {
    $('body').on("scroll", changeNavbarClass);

});


changeNavbarClass()

function changeNavbarClass() {
  const whyChooseUsSection = $("#why-choose-us").offset().top;

  if ($(window).scrollTop() > whyChooseUsSection) {
    nav.addClass("inverse");
  } else {
    nav.removeClass("inverse");
  }
}
