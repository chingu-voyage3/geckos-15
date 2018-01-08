
// ***** STARTING VALUES ***** //

let quizScore = 0; // local value of quiz score
let quizProgress = 0; // max progress 10 = when you answer 10 questions quiz is over and you can start again
let quizMovie; // local movie used for answer comparrison
let quizRecord; // highest score picked up from local storage

// ***** RESTART THE QUIZ ***** //

function quizReset(){
  quizScore = 0;
  quizProgress = 0;
  quizMovie = "";
  quizRecord = 0;
  document.getElementById("movieQuote").innerHTML = "Quote from a movie will be presented, and you should guess the movie it was from. PRESS START TO BEGIN!";
  quizUpdate();
}

// ***** UPDATE HTML WITH NEW VALUES *****//

function quizUpdate(){
  document.getElementById("quizScore").innerHTML = "SCORE: " + quizScore;
  document.getElementById("quizProgress").innerHTML = quizProgress;
  document.getElementById("quizAnswer").value = "";
}

document.getElementById("quizStart").addEventListener("click", function quizStart(){
  quizUpdate();
  getQuote();
});

// ***** PICK A RANDOM QUOTE AND PRINT IT *****//

function getQuote(){
  let randomNumber = Math.round(Math.random() * (movies.length-1));
  document.getElementById("movieQuote").innerHTML = movies[randomNumber].quote;
  quizMovie = movies[randomNumber].movie;
  console.log(quizMovie);
}

// ***** MAIN FUNCTION TRIGGERED BY SUBMIT ANSWER BUTTON CLICK *****//

document.getElementById("quizSubmit").addEventListener("click", function quizSubmit(){
  // Stores the user input
  let quizAnswer = document.getElementById("quizAnswer").value;
  // Checks if the answer is correct & if the game is over
  if(quizAnswer == quizMovie && quizProgress < 10){
    quizScore += 10; // Add points
    quizProgress += 1; // Go to the next step
    document.getElementById("quizCorrect").classList.remove("hide"); // Messages
    document.getElementById("quizWrong").classList.add("hide"); // Messages
    quizUpdate();
    getQuote();
  } else if (quizAnswer !== quizMovie && quizProgress < 10){
    quizScore -= 5;
    quizProgress += 1;
    document.getElementById("quizWrong").classList.remove("hide");
    document.getElementById("quizCorrect").classList.add("hide");
    quizUpdate();
    getQuote();
  } else { // If user plays 10 steps, the game is over
    // Stores current score
    storeQuizScore();
    // Uses function that gets highest score from local storage
    quizHighestScore();
    // Alerts user of his current and highest score
    alert("Your score is " + quizScore + ", and your highest score is " + quizRecord);
    // Restarts the game
    quizReset();
  }
});

// ***** SAVE SCORE TO THE LOCAL STORAGE ***** //

function storeQuizScore(){
  // Object literar for storing scores in local storage
  let quizHistory = {
    score: quizScore
  }
  // If local storage object doesn't exist, create one
  if(localStorage.getItem("highestScore") === null){
    let highestScore = [];
    highestScore.push(quizHistory);
    // Add the value to local storage as JSON object
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
  } else { // If local storage has object in it
    // Transform JSON object to javascript object and store it inside our variable
    let highestScore = JSON.parse(localStorage.getItem("highestScore"));
    highestScore.push(quizHistory);
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
  }
}

// ***** FIND THE HIGHEST SCORE ***** //

function quizHighestScore(){
  let scoreArray = [];
  let quizStorage = JSON.parse(localStorage.getItem("highestScore"));
  // Push all scores into scoreArray
  for(let i = 0; i < quizStorage.length; i++){
    scoreArray.push(quizStorage[i].score);
  }
  // Find max value and store it in global variable for later printing
  quizRecord = Math.max(...scoreArray);
}

// ***** Q/A DATABASE ***** //
var movies = [
  { 	
    "movie": "The Big Lebawski",
    "quote": "I don't roll on the sabbath"
  },
  {
    "movie": "Superbad",
    "quote": "Sorry the Cohen brothers don't direct my porn"
  
  },
  {
    "movie": "Lord of the Rings",
    "quote": "One ring to rule them all"
  },
  {
    "movie": "Animal House",
    "quote": "Fat, drunk, and stupid is no way to go through life, son."
  
  },
  {
    "movie": "Zoolander",
    "quote": "What is this?? A school for ants??"
  
  },
  {
    "movie": "Blues Brothers",
    "quote": "They’re not gonna catch us. We’re on a mission from God."
  
  },
  {
    "movie": "Dr. Stangelove",
    "quote": "Gentlemen, you can’t fight in here! this is the War Room."
  
  },
  {
    "movie": "Dodgeball",
    "quote": "Oh, I don’t think I’m a lot dumber than you think that I thought that I thought I was once."
  
  },
  {
    "movie": "Home Alone",
    "quote": "I believe you but my tommy gun don't"
  
  },
  {
    "movie": "Blade Runner",
    "quote": "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die"
  
  },
  {
    "movie": "They Live",
    "quote": "I have come here to chew bubblegum and kick ass... and I'm all out of bubblegum"
  
  },
  {
    "movie": "Ghostbusters",
    "quote": "when someone asks you if you are a god, you say yes ..."
  
  },
  {
    "movie": "Christmas Vacation",
    "quote": "The little lights aren’t twinkling Clark"
  
  },
  {
    "movie": "Tropic Thunder",
    "quote": "I don't read the script, the script reads me"
  
  },
  {
    "movie": "Predator",
    "quote": "There's something out there waiting for us.... and it ain't no man"
  
  },
  {
    "movie": "The Good The Bad And The Ugly",
    "quote": "When you have to shoot, shoot, don’t talk"
  
  },
  {
    "movie": "Dispicable me",
    "quote": "IT'S SO FLUFFY!!"
  
  },
  {
    "movie": "Zootopia",
    "quote": "... and how did you repay my generosity? With a rug, made from the butt of a skunk... a skunk-butt-rug"
  
  },
  {
    "movie": "The Other Guys",
    "quote": "...Gator never been about that, never, never been about playin' no sh**!"
  
  },
  {
    "movie": "The Dark Knight Rises",
    "quote": "...you think your darkness is your ally? You merely adopted the dark. I was born in it. Moulded by it"
  
  },
  {
    "movie": "Terminator",
    "quote": "Come with me if you want to live"
  
  },
  {
    "movie": "Predator",
    "quote": "Get to the chopper now!"
  
  },
  {
    "movie": "Pulp Fiction",
    "quote": "A royal with cheese"
  
  },
  {
    "movie": "Forrest Gump",
    "quote": "...shrimp is the fruit of the sea; you can BBQ it, broil it, bake it, sauté it... shrimp kebabs, shrimp creole, shrimp gumbo.."
  
  },
  {
    "movie": "The Dark Knight",
    "quote": "Why so serious?"
  
  },
  {
    "movie": "The lord of the rings",
    "quote": "So do all who live to see such times, but that is not for them to decide. All we have to decide is what to do with the time that is given to us"
  
  },
  {
    "movie": "Harry Potter",
    "quote": "Of course it is happening inside your head, but why on earth should that mean that it is not real?"
  
  },
  {
    "movie": "Harry Potter",
    "quote": "It does not dwell on dreams and forget to live"
  
  },
  {
    "movie": "The Goonies",
    "quote": "heeeeyyyyyy youuuuuuu guyyyyssss"
  
  },
  {
    "movie": "Saving Private Ryan",
    "quote": "F.U.B.A.R. Fucked Up Beyond All Recognition"
  
  },
  {
    "movie": "Star Wars",
    "quote": "May the Force be with you"
  
  },
  {
    "movie": "The Godfather",
    "quote": "I’m going to make him an offer he can’t refuse"
  },
  {
    "movie": "Taxi Driver",
    "quote": "You talkin’ to me?"
  },
  ];
