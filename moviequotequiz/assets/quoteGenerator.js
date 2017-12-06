
//document.getElementById("quoteHeader").innerHTML = movies[0].quote;


let rndObject = movies[Math.floor(Math.random()* movies.length)];
let movieTitle = rndObject.movie;
let movieQuote = rndObject.quote;

function generateQuote(){
	//shows quote from the json objects 
	document.getElementById('quoteHeader').innerHTML = movieQuote; 
};
generateQuote();

var userAnswer = document.getElementById('userAnswerText').innerHTML;
let counter = 0; 


function answerCheck(){
	if (userAnswer == movieTitle){
		counter += 2000;
		alert ("You did it!");
	}
	else return alert("Close, but no cigar");
	console.log(userAnswer);
}

