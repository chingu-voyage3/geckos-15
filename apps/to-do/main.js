
displayPending();

document.getElementById("add").addEventListener("click", addData);

function addData() {
  let userInput = item.value;
  if(localStorage.getItem("pending") === null) {
    let pendingItems = [];
    pendingItems.push(userInput);
    localStorage.setItem("pending", JSON.stringify(pendingItems));
  } else {
    let pendingItems = JSON.parse(localStorage.getItem("pending"));
    pendingItems.push(userInput);
    localStorage.setItem("pending", JSON.stringify(pendingItems));
  }
  item.value = "";
  displayPending();

}

function displayPending() {
  let sItems = JSON.parse(localStorage.getItem("pending"));
  document.getElementById("pending-items").innerHTML = "";

  if(localStorage.getItem("pending")){
    for (let i = 0; i < sItems.length; i++){
      document.getElementById("pending-items").innerHTML += "<div class='container list' id='" + i + "ab'><p>" + sItems[i] + "<span class='pull-right'><i class='fa fa-trash fa-2x' onclick='removeData(this.id)' id='"+ i +"'></i></span></p></div>";
    }
  }
}

function removeData(e) {
  let pItems = JSON.parse(localStorage.getItem("pending"));
  pItems.splice(e, 1);
  localStorage.setItem("pending", JSON.stringify(pItems));
  displayPending();
}

