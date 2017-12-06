
//document.getElementById("quoteHeader").innerHTML = movies[0].quote;


let rndNumber = [Math.floor(Math.random()* movies.length)];
let movieTitle = movies[rndNumber].movie;
let movieQuote = movies[rndNumber].quote;
console.log(movieQuote);
console.log(movieTitle);

function generateQuote(){
	//shows quote from the json objects 
	document.getElementById('quoteHeader').innerHTML = movieQuote; 
};
generateQuote();

/*
let counter = 0; 

answerCheck.addEventListener('click', userAnswerCheck());
function userAnswerCheck(){
	var userAnswer = document.getElementById('userAnswerText').innerHTML;
	console.log(userAnswerText)
	if (userAnswer == movieTitle){
		counter += 2000;
		alert ("You did it!");
	}
	else alert("Close, but no cigar");
	//console.log(userAnswer);
}
*/
let counter = 0;
const answerCheck = document.getElementById('answerButton');

answerCheck.addEventListener('click', userAnswerCheck);

function userAnswerCheck(){
   const userAnswerText = document.getElementById('userAnswerText');
   console.log(userAnswerText.value)
   if (userAnswerText.value == movieTitle){
       counter += 2000;
       alert ("You did it!");
   }
   else alert("Close, but no cigar");
}


