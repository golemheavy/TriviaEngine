let gameOver = false;
let targetDiv = null;
let questionIndex = 0;
let questionIntervalId = null;
let time = 15;
let convertedTime;

function resetTimer() {
	time = 15;
  // $("#display").text("00:00")  // replace this function call
}

// trivia questions lifted from:
// http://www.usefultrivia.com/tv_trivia/star_trek_trivia_index.html
const questionData = [
	{
		question:	"In Gene Roddenberry's original treatment for Star Trek, what was the name of the Starship?",
		flavor:		"You can't just call it 'Starship'",
		answers:	["Yorktown","Plymouth","Reliant","Enterprise"],
		correctAnswerIndex: 0
	},
	{
		question:	"What is Sulu's primary position on the U.S.S. Enterprise?",
		flavor:		"How Are You, Hikaru",
		answers:	["Helmsman","Science Officer","Navigator","Chief Engineer"],
		correctAnswerIndex: 0
	},
	{
		question:	"Which Star Trek captain has an artificial heart?",
		flavor:		"Have a Heart",
		answers:	["Jonathan Archer","Benjamin Sisko","Jean-Luc Picard","Kathryn Janeway"],
		correctAnswerIndex: 2
	},
	{
		question:	"Who was the first Vulcan science officer aboard the starship Enterprise?",
		flavor:		"Priority Matters",
		answers:	["Spock","T'pol","Tuvok","Sarek"],
		correctAnswerIndex: 1
	},
	{
		question:	"Which alien race did Ronald Reagan say reminded him of Congress?",
		flavor:		"Filed under 'Presidential Wit'",
		answers:	["Borg","Vulcans","Klingons","Ferengi"],
		correctAnswerIndex: 2
	},
	{
		question:	"Which species was the first to discover warp drive?",
		flavor:		"Big Kids on the Block",
		answers:	["Klingons","Humans","Borg","Vulcans"],
		correctAnswerIndex: 3
	},
	{
		question:	"Which Star Trek actor originally devised the Klingon language?",
		flavor:		"A Gentleman and a Scholar", // "A Rare and Cunning Linguist",
		answers:	["Michael Ansara","James Doohan","Mark Lenard","Leonard Nimoy"],
		correctAnswerIndex: 1
	},
	{
		question:	"What character was adopted by the Vulcan ambassador Sarek?",
		flavor:		"Cultural Exchange",
		answers:	["Spock","Sybok","Sylvia Tilly","Michael Burnham"],
		correctAnswerIndex: 0
	}
];

var textElements = {
	selectedAnswerText	: document.getElementById("selected-answer"),
	questionText		: document.getElementById("question-text"),
	flavorText			: document.getElementById("flavor-text"),
	questionNumberText	: document.getElementById("question-number"),
	answerButtonOne		: document.getElementById("choice-1"),
	answerButtonTwo		: document.getElementById("choice-2"),
	answerButtonThree	: document.getElementById("choice-3"),
	answerButtonFour	: document.getElementById("choice-4")
};

function calculateScore() {
	var score = 0;
	for (var x = 0; x < questionData.length; x++) {
		if (questionData[x].UserAnswer !== "Nothing Selected" && questionData[x].UserAnswer.includes(questionData[x].answers[questionData[x].correctAnswerIndex])) score++;
	}
	return score;
}

function displayScore() {
// unhide scoreboard div and hide question card / container div
};

function countDown() {
	time--;
	convertedTime = timeConverter(time); // Get the current time, pass that into the timeConverter function, and save the result in a variable.
// $("#display").text(convertedTime); // need to replace this since I am not using jquery here
}

function timeConverter(t) {

  //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (minutes === 0) {
		minutes = "00";
	}
	else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}

function clickListener(event) {
	if (gameOver) { document.removeEventListener('click', clickListener); return; } // also need to display game over message, and clear interval
	var clickedValue = event.target;
	if (clickedValue.attributes[1]) {
		if (clickedValue.attributes[1].value.includes("choice-btn")) {
			if (clickedValue.attributes[0].value !== "undefined") {
				targetDiv = document.getElementById(clickedValue.attributes[0].value);
				textElements.selectedAnswerText.textContent = "You selected: " + targetDiv.innerHTML;
			}
		}
		else if (clickedValue.attributes[0].value !== "undefined") {
			if (clickedValue.attributes[0].value === "next-question") {
				questionData[questionIndex-1].UserAnswer = textElements.selectedAnswerText.innerHTML;
				textElements.selectedAnswerText.textContent = "Nothing Selected"
				clearInterval(questionIntervalId);
				gameLoop();
			}
		}
	}
}

function nextQuestion() {
	
	if (questionIndex > 0 && typeof questionData[questionIndex-1].UserAnswer === "undefined") questionData[questionIndex-1].UserAnswer = textElements.selectedAnswerText.innerHTML; //this sets the users answer in the data object if the question times out instead of user clicking next question 
	//need to deactivate the previously selected button here
	textElements.selectedAnswerText.textContent = "Nothing Selected"
	if (questionIndex < questionData.length) {
		textElements.questionText.textContent = questionData[questionIndex].question;
		textElements.flavorText.textContent = questionData[questionIndex].flavor;
		textElements.questionNumberText.textContent = "Question #" + parseInt(questionIndex + 1);
		textElements.answerButtonOne.textContent = questionData[questionIndex].answers[0];
		textElements.answerButtonTwo.textContent = questionData[questionIndex].answers[1];
		textElements.answerButtonThree.textContent = questionData[questionIndex].answers[2];
		textElements.answerButtonFour.textContent = questionData[questionIndex].answers[3];
		questionIndex++;
	}
	else {clearInterval(questionIntervalId); gameOver = true; gameOverFunc(); return;} // call a game over function to calculate and display score } // display game over message and remove click listener and clear interval
}

function gameLoop() {
	
	nextQuestion();
	questionIntervalId = setInterval(nextQuestion, 15 * 1000);

}

function gameOverFunc() {
	
	gameOver = true;
	targetDiv = document.getElementById("next-question");
	targetDiv.remove();
	targetDiv = document.getElementById("main");
	targetDiv.remove();
	textElements.selectedAnswerText.textContent = "";
	// console.log(calculateScore()); // returns a value from 0 to guestionData.length representing the number they got right
	displayScore(calculateScore()); // displays score and win / lose message

}

document.addEventListener('click', clickListener);
gameLoop();