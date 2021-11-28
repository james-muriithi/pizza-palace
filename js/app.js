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

Pizza.prototype.setCrust = function (crustId) {
  const selectedCrust = crusts.find(({ id }) => id == crustId);
  if (selectedCrust) {
    this.crust = selectedCrust;
    this.calculatePrice();
  }
};

Pizza.prototype.setToppings = function (toppings) {
  this.toppings = toppings;
  this.calculatePrice();
};

Pizza.prototype.calculatePrice = function () {
  let price = this.price;

  if (this.crust) {
    price += this.crust.price;
  }

  if (this.toppings.length > 0) {
    this.toppings.forEach((topping) => {
      price += topping.price;
    });
  }

  this.price = price;
};

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
  new Pizza(
    1,
    "Tikka Chicken",
    "./images/pizzas/pizza1.png",
    600,
    pizzaSizes[0]
  ),
  new Pizza(
    2,
    "Chicken & Mushroom",
    "./images/pizzas/pizza2.png",
    1100,
    pizzaSizes[1]
  ),
  new Pizza(
    3,
    "Sweet Chilli Chicken",
    "./images/pizzas/pizza3.png",
    1000,
    pizzaSizes[2]
  ),
  new Pizza(
    4,
    "Mexican Fiesta",
    "./images/pizzas/pizza4.png",
    1000,
    pizzaSizes[1]
  ),
  new Pizza(5, "BBQ Chcken", "./images/pizzas/pizza5.png", 600, pizzaSizes[0]),
  new Pizza(
    6,
    "Four Seasons",
    "./images/pizzas/pizza6.png",
    800,
    pizzaSizes[2]
  ),
  new Pizza(
    7,
    "CHICKEN O’RELLO",
    "./images/pizzas/pizza7.png",
    600,
    pizzaSizes[0]
  ),
  new Pizza(
    8,
    "Peri Peri Chicken",
    "./images/pizzas/pizza8.png",
    1200,
    pizzaSizes[1],
    2
  ),
];

// UI Logic
const nav = $("nav");
// initiaize new Cart object
const cart = new Cart();

$(function () {
  $("body").on("scroll", changeNavbarClass);

  $(".filter-button").on("click", filterPizzas);

  appendPizzas(pizzas);

  //   order button on click
  $(document).on("click", ".order.btn", function () {
    const pizzaId = $(this).data("pizza");
    const selectedPizza = pizzas.find((pizza) => pizza.id == pizzaId);

    cart.addItem(selectedPizza);

  });
});

changeNavbarClass();

// functions

// filter pizzas
function filterPizzas() {
  const size = $(this).data("filter");
  $(this).addClass("active").siblings().removeClass("active");
  if (size != "all") {
    const filteredPizzas = pizzas.filter((pizza) => pizza.size == size);

    appendPizzas(filteredPizzas);
  } else {
    appendPizzas(pizzas);
  }
}

// change navbar bg color on scroll
function changeNavbarClass() {
  const whyChooseUsSection = $("#why-choose-us").offset().top;

  if ($(window).scrollTop() > whyChooseUsSection) {
    nav.addClass("inverse");
  } else {
    nav.removeClass("inverse");
  }
}

// append all pizzas

function appendPizzas(pizzas) {
  const menuSection = $(".pizzas");

  menuSection.html("");

  pizzas.forEach((pizza) => {
    menuSection.append(getPizzaCard(pizza));
  });
}

// returns a pizza card

function getPizzaCard(pizza) {
  return `<div class="col-md-4 col-lg-3 col-sm-6 mb-3 col-xl-2">
    <div class="pizza-card p-3">

        <div class="card-image">
            <img src="${pizza.image}" alt="" class="img-fluid">
        </div>

        <div class="pizza-details">
            <h2 class="pizza-title py-3">
                ${pizza.name}
            </h2>

            <p class="price">
                Ksh ${pizza.price}
                <small class="float-end text-muted text-capitalize">${
                  pizza.size
                }</small>
            </p>

            <div class="rating-order row">
                <div class="col-6 d-flex align-items-center">
                    <div class="rating">
                        ${getPizzaRating(pizza.rating)}
                        <span class="ps-2 number">
                            ${pizza.rating}
                        </span>
                    </div>
                </div>
                <div class="col-6 text-center">
                    <button class="order btn" data-pizza="${pizza.id}">
                        <img src="./images/cart.png" alt="" class="img-fluid">
                        Order
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>`;
}

// function to get pizza rating stars
function getPizzaRating(rating) {
  let ratingsHtml = "";
  [...Array(5)].forEach((_, i) => {
    if (rating >= i + 1) {
      ratingsHtml += `<i class="fa fa-star active-star"></i>`;
    } else {
      ratingsHtml += `<i class="far fa-star"></i>`;
    }
  });

  return ratingsHtml;
}
