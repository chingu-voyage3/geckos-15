// UPDATE HTML ELEMENTS WITH DATA FROM LOCAL STORAGE
displayPending();

document.getElementById("add").addEventListener("click", addData);
// ADD NEW ACTIVITY
function addData() {
  // STORE USER INPUT
  let userInput = item.value;
  // IF LOCAL STORAGE IS EMPTY, CREATE NEW "pending" DATA
  if(localStorage.getItem("pending") === null) {
    let pendingItems = [];
    pendingItems.push(userInput);
    // ADD DATA TO LOCAL STORAGE AS JSON OBJECT
    localStorage.setItem("pending", JSON.stringify(pendingItems));
  } else {
    // IF THERE'S DATA IN LOCAL STORAGE, JUST ADD TO IT
    let pendingItems = JSON.parse(localStorage.getItem("pending"));
    pendingItems.push(userInput);
    localStorage.setItem("pending", JSON.stringify(pendingItems));
  }
  // RESET INPUT, SO IT SHOWS PLACEHOLDER INSTEAD OF LAST USER INPUT
  item.value = "";
  displayPending();

}
// UPDATE HTML ELEMENTS WITH LOCAL STORAGE DATA
function displayPending() {
  // GET LOCAL STORAGE DATA
  let sItems = JSON.parse(localStorage.getItem("pending"));
  // EMPTY THE HTML ELEMENT BEFORE THE LOOP
  document.getElementById("pending-items").innerHTML = "";
  // CHECK IF THERE'S DATA IN LOCAL STORAGE
  if(localStorage.getItem("pending")){
    // LOOP THROUGH THE DATA AND UPDATE HTML ELEMENT
    for (let i = 0; i < sItems.length; i++){
      document.getElementById("pending-items").innerHTML += "<div class='container list' id='" + i + "ab'><p>" + sItems[i] + "<span class='pull-right'><i class='fa fa-trash fa-2x' onclick='removeData(this.id)' id='"+ i +"'></i></span></p></div>";
    }
  }
}
// REMOVE DATA FROM LOCAL STORAGE
// NOTICE onclick='removeData(this.id) IN NEWLY CREATED HTML ELEMENT
// WE WILL PASS "this.id" AS ARGUMENT "e" IN FUNCTION BELOW
// THAT WILL REFER TO THE PARENT DIV OF BUTTON THAT'S BEING CLICKED
function removeData(e) {
  // GET DATA
  let pItems = JSON.parse(localStorage.getItem("pending"));
  // REMOVE THE ITEM
  pItems.splice(e, 1);
  // STORE REMAINING DATA TO LOCAL STORATE
  localStorage.setItem("pending", JSON.stringify(pItems));
  // UPDATE HTML WITH NEW DATA
  displayPending();
}

