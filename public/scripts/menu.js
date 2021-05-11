async function makeAPostRequest(passedIndex) {
  const passedData = { index: passedIndex };
  await axios
    .post("/mycart", passedData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
