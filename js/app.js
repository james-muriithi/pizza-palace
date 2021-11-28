// Business Logic

function Pizza(id, name, image, price, size, rating = 4) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.size = size;
  this.image = image;
  this.toppings = [];
  this.rating = rating;
  this.total = 0;
}

Pizza.prototype.setCrust = function (crustId) {
  const selectedCrust = crusts.find(({ id }) => id == crustId);
  if (selectedCrust) {
    this.crust = selectedCrust;
    this.calculateTotal();
  }
};

Pizza.prototype.setToppings = function (toppings) {
  this.toppings = toppings;
  this.calculateTotal();
};

Pizza.prototype.calculateTotal = function () {
  let price = this.price;

  if (this.crust) {
    price += this.crust.price;
  }

  if (this.toppings.length > 0) {
    this.toppings.forEach((pricetopping) => {
      price += pricetopping.price;
    });
  }

  this.total = price;
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

Topping.prototype.setPrice = function (size) {
  const price = this.prices.find((sizePrice) => sizePrice.size == size);
  if (price) {
    this.price = price.price;
  } else {
    this.price = 0;
  }
};

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

  var selectedPizza;

  //   order button on click
  $(document).on("click", ".order.btn", function () {
    const pizzaId = $(this).data("pizza");
    selectedPizza = pizzas.find((pizza) => pizza.id == pizzaId);

    // cart.addItem(selectedPizza);
    appendPizzaCrusts();
    appendPizzaToppings(selectedPizza);

    $("#crust-toppings-modal").modal("show");
  });

  // select pizza crust
  $("body").on("click", ".crust-card", function () {
    // uncheck all sizes first
    $("input.burger-crust").prop("checked", false);
    const crustCheckbox = $(this).prev();
    crustCheckbox.prop("checked", !crustCheckbox.prop("checked"));
    selectedPizza.setCrust(crustCheckbox.val());
  });

  // select burger toppings
  $("body").on("click", ".topping-card", function () {
    // uncheck all sizes first
    // $("input.topping-crust").prop("checked", false);
    const toppingCheckbox = $(this).prev();
    toppingCheckbox.prop("checked", !toppingCheckbox.prop("checked"));
    const selectedToppings = [];
    $("input.burger-topping:checked").each((_, element) => {
      selectedToppings.push(toppings.find(({ id }) => id == $(element).val()));
    });
    selectedPizza.setToppings(selectedToppings);
  });

  // add to cart
  $(".btn-add-to-cart").on("click", function () {
    if (selectedPizza && selectedPizza.crust) {
      cart.addItem(selectedPizza);
      updateCart(cart);
      $("#crust-toppings-modal").modal("hide");
    } else {
      alert("Please choose a crust");
    }
  });

  // remove from cart
  $("body").on("click", ".btn-remove-from-cart", function () {
    cart.removeItem($(this).data("item"));
    updateCart(cart);
  });

  // toggle show cart
  $(".cart").on("click", function () {
    $(".shopping-cart").toggleClass("d-none");
  });

  // select delivery
  $("body").on("click", ".delivery-card", function () {
    // uncheck all sizes first
    $("input.delivery").prop("checked", false);
    const deliveryCheckbox = $(this).prev();
    deliveryCheckbox.prop("checked", !deliveryCheckbox.prop("checked"));
    if (deliveryCheckbox.val() == 1) {
      $(".delivery-info")
        .removeClass("d-none")
        .find("input")
        .prop("required", true);
    } else {
      $(".delivery-info")
        .addClass("d-none")
        .find("input")
        .prop("required", false);
    }
    cart.setDeliveryMethod(deliveryCheckbox.val());
  });

  //   customer details proceed

  $("#personal-details-form").on("submit", function (e) {
    e.preventDefault();
    const fullName = $("input.fullName").val();
    const contact = $("input.contact").val();
    const location = $("input.location").val();
    const info = $("input.info").val();

    cart.setCustomerDetails({ fullName, contact, location, info });
    cart.calculateGrandTotal();
    updateOrderConfirmedModal(cart);
    $("#delivery-modal").modal("hide");
    // clear cart
    cart.clearCart();
    updateCart(cart);
    $("#personal-details-form")[0].reset();

    $("#order-success-modal").modal("show");
  });
});

changeNavbarClass();

// functions

// append pizza crusts

function appendPizzaCrusts() {
  const crustsContainer = $(".crusts");
  crustsContainer.html("");

  crusts.forEach(({ id, name, price }) => {
    crustsContainer.append(`<div class="col-md-6 col-lg-3 col-6 mb-2">
        <input id="crust-${id}" value="${id}" hidden type="radio" class="burger-crust">
        <div class="size crust-card p-1">
            <div class="text-center pt-2">
                <img src="./images/crust.png" alt="" height="30" class="img-fluid">
            </div>
            <div class="row pt-3 px-2">
                <div class="col-12 text-start">
                    <small class="text-capitalize">${name}</small>
                </div>
                <div class="col-12 fw-bold text-start">
                    Ksh. ${price}
                </div>
            </div>
        </div>
      </div>`);
  });
}

function appendPizzaToppings(selectedPizza) {
  const toppingsContainer = $(".toppings");
  toppingsContainer.html("");

  toppings.forEach((topping) => {
    topping.setPrice(selectedPizza.size);
    toppingsContainer.append(`<div class="col-md-6 col-lg-3 col-6 mb-3">
          <input id="topping-${topping.id}" value="${topping.id}" hidden type="radio" class="burger-topping">
          <div class="size topping-card p-1">
              <div class="text-center pt-2">
                  <img src="./images/ion_fast-food.png" alt="" height="30" class="img-fluid">
              </div>
              <div class="row pt-3 px-2">
                  <div class="col-12 text-start">
                      <small class="crusttext-capitalize">${topping.name}</small>
                  </div>
                  <div class="col-12 fw-bold text-start">
                      Ksh. ${topping.price}
                  </div>
              </div>
          </div>
        </div>`);
  });
}

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

function updateCartCount(cartCount = 0) {
  $(".cart-counter").text(cartCount);
}

function updateCartTotal(total = 0) {
  $(".cart-total").text(total);
}

function updateCart(cart) {
  if (cart.items.length > 0) {
    $(".shopping-cart-items").html("");
    $(".btn-checkout").prop("disabled", false);

    cart.items.forEach((item, itemIndex) => {
      $(".shopping-cart-items")
        .append(`<li class="clearfix row align-items-center">
              <div class="col-4">
                  <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="col-8 px-0">
                  <span class="item-name fw-bold">${item.name} (${
        item.size
      })</span>
                  <div><small>Crust: ${item.crust.name}</small></div>
                  <div><small>Toppings: ${item.toppings
                    .map((t) => t.name)
                    .join(", ")}</small></div>
                  <span class="item-price">Ksh ${item.total}</span> X
                  <span class="item-quantity">
                      ${item.quantity}
                  </span>
                  <span class="ms-auto">
                      <button class="btn btn-sm btn-remove-from-cart" data-item="${itemIndex}">
                          <img src="./images/dustbin.png" alt="delete" height="15" width="15"></img>
                      </button>
                  </span>
              </div>
          </li>`);
    });
  } else {
    $(".btn-checkout").prop("disabled", true);

    $(".shopping-cart-items").html(`<div class="d-flex justify-content-center">
          <img src="./images/empty-cart.png" alt="empty cart" class="img-fluid" />
          </div>`);
  }

  updateCartCount(cart.items.length);
  updateCartTotal(cart.total);
}


function updateOrderConfirmedModal(cart) {
    $(".order-details-container")
      .html(`<div class="row d-flex justify-content-center">
      <div class="col-md-12">
          <div class="card">
              <div class="text-center logo p-2 px-5"> 
                  <img src="./images/order-delivery.png" alt="order Confirmed" height="128" width="112">
              </div>
              <div class="invoice p-5">
                  <h5>Your order has been Confirmed!</h5>
                  <span class="font-weight-bold d-block mt-4 mb-2">Hello, ${
                    cart.customerDetails.fullName
                  }</span>
                  <span>You order has been placed successfully${
                    cart.deliveryMethod == 1
                      ? " and will be delivered to your location"
                      : ""
                  }!</span>
                  <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
                      <table class="table table-borderless">
                          <tbody>
                              <tr>
                                  <td>
                                      <div class="py-2"> <span class="d-block text-muted">Order
                                              Date</span>
                                          <span>${new Date().toDateString()}</span>
                                      </div>
                                  </td>
                                  <td>
                                      <div class="py-2"> <span class="d-block text-muted">Order
                                              No</span>
                                          <span>MT12332345</span>
                                      </div>
                                  </td>
                                  ${
                                    cart.deliveryMethod == 1
                                      ? '<td><div class="py-2"> <span class="d-block text-muted">Delivery</span>\
                                      <span>' +
                                        cart.customerDetails.location +
                                        "</span>\
                                  </div></td>"
                                      : ""
                                  }
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div class="product border-bottom table-responsive">
                      <table class="table table-borderless">
                          <tbody>
                              ${generateOrderDetails(cart.items)}
                          </tbody>
                      </table>
                  </div>
                  <div class="row d-flex justify-content-end">
                      <div class="col-md-5">
                          <table class="table table-borderless">
                              <tbody class="totals">
                                  <tr>
                                      <td>
                                          <div class="text-left"> <span
                                                  class="text-muted">Subtotal</span> </div>
                                      </td>
                                      <td>
                                          <div class="text-right"> <span>Ksh. ${
                                            cart.total
                                          }</span>
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <div class="text-left"> <span
                                                  class="text-muted">Shipping Fee</span>
                                          </div>
                                      </td>
                                      <td>
                                          <div class="text-right"> <span>Ksh. ${
                                            cart.deliveryMethod == 1
                                              ? cart.deliveryFee
                                              : 0
                                          }</span> </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <div class="text-left"> <span
                                                  class="text-muted">Discount</span> </div>
                                      </td>
                                      <td>
                                          <div class="text-right"> <span class="text-success">Ksh.
                                                  0</span>
                                          </div>
                                      </td>
                                  </tr>
                                  <tr class="border-top border-bottom">
                                      <td>
                                          <div class="text-left"> <span
                                                  class="font-weight-bold">Total</span> </div>
                                      </td>
                                      <td>
                                          <div class="text-right"> <span
                                                  class="font-weight-bold">Ksh. ${
                                                    cart.grandTotal
                                                  }</span>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <p class="font-weight-bold mb-0">Thanks for shopping with us!</p>
              </div>
          </div>
      </div>
  </div>`);
  }
  
  function generateOrderDetails(orderItems) {
    let itemsMarkup = ``;
    orderItems.forEach((item) => {
      itemsMarkup += `<tr>
          <td width="20%"> <img src="${item.image}"
                  width="90"> </td>
          <td width="60%"> <span class="font-weight-bold">${item.name} (${
        item.size
      })</span>
              <div class="product-qty"> <span class="d-block">Quantity:
              ${item.quantity}</span>
                  <span>Crust: ${item.crust.name}</span> <br>
                  <span>Toppings: ${item.toppings
                    .map((t) => t.name)
                    .join(", ")}</span>
              </div>
          </td>
          <td width="20%">
              <div class="text-right"> <span class="font-weight-bold">Ksh.
              ${item.price}</span>
              </div>
          </td>
      </tr>`;
    });
  
    return itemsMarkup;
  }