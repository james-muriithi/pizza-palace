// Business Logic

function Pizza(id, name, image, price, size, rating = 4) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.size = size;
    this.image = image;
    this.toppings = [];
    this.rating = rating;
  }


//   pizzas array
  const pizzas = [
    new Pizza(1, "Tikka Chicken", "./images/pizza/pizza1.png"),
    new Pizza(2, "Chicken & Mushroom", "./images/pizza/pizza2.png"),
    new Pizza(3, "Sweet Chilli Chicken", "./images/pizza/pizza3.png"),
    new Pizza(4, "Mexican Fiesta", "./images/pizza/pizza4.png"),
    new Pizza(5, "BBQ Chcken", "./images/pizza/pizza5.png"),
    new Pizza(6, "Four Seasons", "./images/pizza/pizza6.png"),
    new Pizza(7, "Meet Steak & Mushroom", "./images/pizza/pizza7.png"),
    new Pizza(8, "Peri Peri Chicken", "./images/pizza/pizza8.png"),
  ];

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
