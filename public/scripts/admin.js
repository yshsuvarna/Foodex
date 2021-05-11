async function removeRecipe(passedIndex) {
  await axios
    .delete("/admin/showfoodmenu/" + passedIndex)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  location.reload(true);
}