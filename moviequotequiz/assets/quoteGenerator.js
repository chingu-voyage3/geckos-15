
//declaring random variables from the json objects
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

// when button is pushed to submit user answer
const answerCheck = document.getElementById('answerButton');
answerCheck.addEventListener('click', userAnswerCheck);
//score counter
let counter = 0;
function userAnswerCheck(){
   const userAnswerText = document.getElementById('userAnswerText');
   // make all the same case so there are no issues 
   if (userAnswerText.value.toLowerCase() == movieTitle.toLowerCase()){
       counter += 2000;
       //so that page reloads after alert
       if(!alert(positiveResponse)){window.location.reload();}
   }
   else alert(negativeResponse);
}

//incase the user doent know the answer and gives up
const whiteFlag = document.getElementById('giveUp');
whiteFlag.addEventListener('click', advanceToNextMovie);
function advanceToNextMovie() {
	if(!alert(movieTitle)){window.location.reload();}
}


