document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display the menu when the page loads
  getMenu();

  // Handle the place order button click
  document.getElementById("order-btn").addEventListener("click", async function () {
    try {
      const order = await takeOrder();
      console.log("Order taken:", order);

      const orderStatus = await orderPrep();
      console.log("Order prepared:", orderStatus);

      const paymentStatus = await payOrder();
      console.log("Payment status:", paymentStatus);

      if (paymentStatus.paid) {
        thankyouFnc();
      }
    } catch (error) {
      console.error("Error handling order:", error);
    }
  });
});

function getMenu() {
  fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    .then((response) => response.json())
    .then((menuItems) => {
      let menuDisplay = document.getElementById("menu");
      menuDisplay.innerHTML = ""; // Clear any existing content

      menuItems.forEach((item) => {
        console.log(item);
        let menuItem = document.createElement("div");
        menuItem.className = "menu-item";

        menuItem.innerHTML = `
                      <img src="${item.imgSrc}" alt="${item.name}"     onerror="this.onerror = null; this.src = './assets/1/burger.png'">
                      <div class="ff">
                        <div>
                          <h3>${item.name}</h3>
                          <p>Price: $${item.price}</p>
                        </div>
                      
                      <div>
                          <button>+</button>
                      </div>
                      </div>

                  `;
        menuDisplay.appendChild(menuItem);
      });
    })
    .catch((error) => console.error("Error fetching menu:", error));
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const burgers = ["Burger 1", "Burger 2", "Burger 3", "Burger 4", "Burger 5"];
      const order = {
        burger1: burgers[Math.floor(Math.random() * burgers.length)],
        burger2: burgers[Math.floor(Math.random() * burgers.length)],
        burger3: burgers[Math.floor(Math.random() * burgers.length)],
      };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

const img = document.getElementsByTagName("img");
img.addEventListener("error", function (event) {
  event.target.src = "./assets/1/burger.png";
  event.onerror = null;
});
