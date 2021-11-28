//  Cart functionality
function Cart() {
  this.items = [];
  this.total = 0;
  this.grandTotal = 0;
  this.deliveryFee = 150;
  this.deliveryMethod = 0;
}

Cart.prototype.addItem = function (pizza) {
  if (
    this.items.some((item) => {
      return this.isSameItem(item, pizza);
    })
  ) {
    let itemIndex;
    this.items.some((item, index) => {
      if (this.isSameItem(item, pizza)) {
        itemIndex = index;
        return;
      }
      return;
    });
    this.items[itemIndex].quantity += 1;
  } else {
    let item = { ...pizza, quantity: 1 };
    this.items.push(item);
  }
  this.calculateTotal();
};

Cart.prototype.removeItem = function (itemIndex) {
  this.items = this.items.filter((_, index) => index != itemIndex);
  this.calculateTotal();
};

Cart.prototype.setDeliveryMethod = function (method) {
  this.deliveryMethod = method;
};

Cart.prototype.calculateGrandTotal = function () {
  this.calculateTotal();
  this.grandTotal = this.total;
  if (this.deliveryMethod != 0) {
    this.grandTotal += this.deliveryFee;
  }

  return this.grandTotal;
};

Cart.prototype.calculateTotal = function () {
  this.total = this.items.reduce((prevItem, currentItem) => {
    return prevItem + currentItem.price * currentItem.quantity;
  }, 0);
};

Cart.prototype.clearCart = function () {
  this.items = [];
  this.deliveryMethod = 0;
  this.customerDetails = {};
  this.calculateGrandTotal();
};

Cart.prototype.setCustomerDetails = function ({
  fullName,
  contact,
  location = null,
  info = null,
}) {
  this.customerDetails = {
    fullName,
    contact,
    location,
    info,
  };
};

Cart.prototype.isSameItem = function (item1, item2) {
  const sameCrust = item1.crust.id == item2.crust.id;
  const sameToppings =
    JSON.stringify(item1.toppings.map((c) => c.id)) ==
    JSON.stringify(item2.toppings.map((c) => c.id));
  return item1.id == item2.id && sameCrust && sameToppings;
};
