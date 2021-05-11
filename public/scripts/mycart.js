const { response } = require("express");

async function removeFromCart(passedIndex) {
  await axios
    .delete("/mycart/" + passedIndex)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  location.reload(true);
}


async function reloadMycart(currentOrderId) {
  await axios
    .get("/checkstatus/" + currentOrderId)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  location.reload(true);
}