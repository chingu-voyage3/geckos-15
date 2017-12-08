
//document.getElementById("quoteHeader").innerHTML = movies[0].quote;


let rndNumber = [Math.floor(Math.random()* movies.length)];
let movieTitle = movies[rndNumber].movie;
let movieQuote = movies[rndNumber].quote;
let negativeResponse = negative[rndNumber].response;
console.log(negativeResponse);
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





const answerCheck = document.getElementById('answerButton');
answerCheck.addEventListener('click', userAnswerCheck);


let counter = 0;
function userAnswerCheck(){
   const userAnswerText = document.getElementById('userAnswerText');
   if (userAnswerText.value.toLowerCase() == movieTitle.toLowerCase()){
       counter += 2000;
       //so that page reloads after alert
       if(!alert(positive[rndNumber].response)){window.location.reload();}
   }
   else alert(negative[rndNumber].response);
}


const whiteFlag = document.getElementById('giveUp');
whiteFlag.addEventListener('click', advanceToNextMovie);

function advanceToNextMovie() {
	if(!alert(movieTitle)){window.location.reload();}
}


