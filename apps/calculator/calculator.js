$(document).ready(function(){
  // Store values of user inputs
  let inputs = [""];
  // Store value after operations have been done
  let totalString;
  // Our operators
  let operators1 = ["+", "-", "/", "*"];
  let operators2 = ["."];
  // Numbers to be calculated
  let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
  // Get user input values and store them for calculations
  function getValue(input){
    // Prevents using double decimal dots
    if (operators2.includes(inputs[inputs.length - 1]) === true && input === "."){
      alert ("You can't have more than one '.'!");
    }
    // Prevents storing operators, initially failing the calculation
    else if (inputs.length === 1 && operators1.includes(input) === false){
      inputs.push(input);
    }
    // Prevents storing operators on numbers longer than 1 length (<9)
    else if (operators1.includes(inputs[inputs.length-1]) === false){
      inputs.push(input);
    }
    // If input is something other than a number, prevent storing it
    else if (nums.includes(Number(input))){
      inputs.push(input);
    }
    // Run function to join numbers array into a single string
    update();
  }
  
  // Join all inputs into a number (user pressed "1", "2", "3" to create a number 123 > join array elements to make it "123")
  function update(){
    totalString = inputs.join("");
    $("#calculatorDisplay").html(totalString);
  }
  
  function getTotal(){
    totalString = inputs.join("");
    // Use math operations using string as a source
    $("#calculatorDisplay").html(eval(totalString));    
  }
  
  // Create on click event on all <a> elements
  $("a").on("click", function (){
    // Assign a function to "clearAll" button
    if (this.id === "calculatorClearAll"){
      // Clearn inputs array
      inputs = [""];
      // Update/clear totalString variable
      update();
    } 
    else if (this.id === "calculatorClear"){
      // Remove last user input
      inputs.pop();
      update();
    }
    else if (this.id === "equals"){
      // Calculate and display the value
      getTotal();
    }
    else {
      if(inputs[inputs.length-1].indexOf("+", "-", "*", "/", ".") === -1){
        getValue(this.id);
      }
      else {
        getValue(this.id);
      }
    }
  });  
});