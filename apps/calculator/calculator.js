


let calcDisplay = "";

$("a").on("click", function(){
  if(this.id === "calculatorClear"){
    calcDisplay = "";
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
  else if (this.id === "calculatorEquals"){
    calcDisplay = eval(calcDisplay);
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
  else {
    calcDisplay += this.id;
    document.getElementById("calculatorDisplay").innerHTML = calcDisplay;
  }
});
