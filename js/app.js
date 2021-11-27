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

//   pizza sizes

const pizzaSizes = ["small", "large", "medium"];

// pizza toppings

function Topping(id, name) {
  this.id = id;
  this.name = name;
  this.prices = [
    {
      size: "small",
      price: 50,
    },
    {
      size: "medium",
      price: 80,
    },
    {
      size: "large",
      price: 100,
    },
  ];
}

// toppings array

const toppings = [
  new Topping(1, "Bacon"),
  new Topping(2, "Cheese"),
  new Topping(3, "Mushrooms"),
  new Topping(4, "Avocado"),
];

// crusts array
const crusts = [
  {
    id: 1,
    name: "Crispy",
    price: 100,
  },
  {
    id: 2,
    name: "Stuffed",
    price: 150,
  },
  {
    id: 3,
    name: "Gluten Free",
    price: 110,
  },
];

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
  $("body").on("scroll", changeNavbarClass);
});

changeNavbarClass();

function changeNavbarClass() {
  const whyChooseUsSection = $("#why-choose-us").offset().top;

  if ($(window).scrollTop() > whyChooseUsSection) {
    nav.addClass("inverse");
  } else {
    nav.removeClass("inverse");
  }
}
