


let counter = "";
let rndObject = movies[Math.floor(Math.random()*movies.length)];


function generateQuote(){
	//shows quote from the json objects 
	let newQuote = rndObject.quote;
	document.getElementById('quoteHeader').innerHTML = newQuote; 
};
function generateQuote();

function answerCheck(userAnswer){
	if (userAnswer == rndObject.movie){
		counter += 2000;
		alert ("You did it!");
	}
	else return alert("Nice try");
}