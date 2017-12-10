
/*//declaring random variables from the json objects
let rndNumber = Math.floor(Math.random()* movies.length);
let rndNegResponse = Math.floor(Math.random()* negative.length);
let rndPosResponse = Math.floor(Math.random()* positive.length);
let movieTitle = movies[rndNumber].movie;
let movieQuote = movies[rndNumber].quote;
//promt responses you see when you answer 
// either negative or positive responses
let negativeResponse = negative[rndNegResponse].response;
let positiveResponse = positive[rndPosResponse].response;
console.log(negativeResponse);
console.log(movieTitle);

function generateQuote(){
	//shows movie quote from the json objects 
	document.getElementById('quoteHeader').innerHTML = movieQuote; 
};
generateQuote();

function newQuoteGenerator(){

	let newQuote = movies[rndNumber].quote;
	document.getElementById('quoteHeader').innerHTML = newQuote;
};

// when button is pushed to submit user answer
const answerCheck = document.getElementById('answerButton');
answerCheck.addEventListener('click', userAnswerCheck);
//score counter
let counter = 0;
let totalScore = "Your Score: " + counter;
document.getElementById('score').innerHTML = totalScore;

function userAnswerCheck(e){
	e.preventDefault();
   const userAnswerText = document.getElementById('userAnswerText');
   // make all the same case so there are no issues 
   if (userAnswerText.value.toLowerCase() == movieTitle.toLowerCase()){
       //so that page give new quote after correct answer
       	if(!alert(positiveResponse)){window.location.reload();}
       	counter += 2000;
 		console.log(counter);
   }
   else alert(negativeResponse);
}

//incase the user doesnt know the answer and gives up
const whiteFlag = document.getElementById('giveUp');
whiteFlag.addEventListener('click', advanceToNextMovie);
function advanceToNextMovie(e) {
	e.preventDefault();
	if(!alert(movieTitle)){window.location.reload();}
}
*/
//incase the user doent know the answer and gives up
const whiteFlag = document.getElementById("giveUp");
const answerCheck = document.getElementById("answerButton");
//declaring random variables from the json objects
let rndNumber = Math.floor(Math.random() * movies.length);
let rndNegResponse = Math.floor(Math.random() * negative.length);
let rndPosResponse = Math.floor(Math.random() * positive.length);
let randMovie = movies[rndNumber];
//promt responses you see when you answer
// either negative or positive responses
let negativeResponse = negative[rndNegResponse].response;
let positiveResponse = positive[rndPosResponse].response;
//score counter
let counter = parseInt(localStorage.getItem("score"));
console.log(negativeResponse);
// console.log(movieTitle);

function generateQuote() {
  console.log(randMovie);
  document.getElementById("quoteHeader").textContent = "";
  //shows movie quote from the json objects
  document.getElementById("quoteHeader").textContent = randMovie.quote;
  document.getElementById("counter").textContent = "Your Score: " + counter;
}
// when button is pushed to submit user answer
function userAnswerCheck() {
  //   e.preventDefault();
  const userAnswerText = document.getElementById("userAnswerText");
  // make all the same case so there are no issues
  if (userAnswerText.value.toLowerCase() == randMovie.movie.toLowerCase()) {
    counter += 2000;
    localStorage.setItem("score", counter);
    console.log(counter);
    console.log(localStorage.getItem("score"));

    //so that page reloads after alert
    if (!alert(positiveResponse)) {
      window.location.reload();
    }
  } else alert(negativeResponse);
}

generateQuote();
answerCheck.addEventListener("click", userAnswerCheck);
whiteFlag.addEventListener("click", advanceToNextMovie);
function advanceToNextMovie() {
  if (!alert(randMovie.movie)) {
    window.location.reload();
  }
}

