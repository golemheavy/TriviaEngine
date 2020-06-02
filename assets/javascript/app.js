let gameOver = false;
let targetDiv = null;
let questionIndex = 0;
let questionIntervalId = null;
let timerIntervalId = null;
let time = 15;

function resetTimer() {
	clearInterval(timerIntervalId);
	timerIntervalId = setInterval(countDown, 1000);
	time = 15;
	displayTime();
}

function countDown() {
	time--;
	displayTime();
}

function displayTime() {
	targetDiv = document.getElementById("timer");
	if (typeof targetDiv !== "null") targetDiv.innerHTML = time;
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
		correctAnswerIndex: 3
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

function calculateScore() {  // returns a value from 0 to guestionData.length representing the number they got right
	var score = 0;
	for (var x = 0; x < questionData.length; x++) {
		if (questionData[x].UserAnswer !== "Nothing Selected" && questionData[x].UserAnswer.includes(questionData[x].answers[questionData[x].correctAnswerIndex])) score++;
	}
	return score;
}

function displayScore(score) {
// unhide scoreboard div and hide question card / container div
	targetDiv = document.getElementById("scoreboard");
	if (typeof targetDiv !== "null") targetDiv.classList.remove("invisible");
	targetDiv = document.getElementById("user-score");
	if (typeof targetDiv !== "null") targetDiv.innerHTML = "You Scored " + score + " out of " + questionData.length ; 
};

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

function populateAnswers() { // populate and unhide answers pane
	targetDiv = document.getElementById("answer-pane");
	if (typeof targetDiv !== "null" && targetDiv.classList.contains("invisible")) {
		document.removeEventListener('click', endGameClickListener);
		targetDiv.classList.remove("invisible");
		targetDiv.innerHTML = questionData.map(showScores).join('');
	}
}

function showScores(x) {
	var returnString = `<div class="alert alert-primary" style="font-weight:bold;">Question: ` + x.question + "</div>";
	if (x.UserAnswer.includes(x.answers[x.correctAnswerIndex])) returnString += '<div class="alert alert-success" style="font-weight:bold;">';
	else returnString += '<div class="alert alert-danger" style="font-weight:bold;">';
	returnString += 'Answer: ' + x.answers[x.correctAnswerIndex] + ". ";
	returnString += x.UserAnswer + "</div>";
	return returnString;
}

function endGameClickListener(event) {
	if (gameOver) {
		var clickedValue = event.target;
		if (typeof clickedValue.attributes[1] !== "undefined" && clickedValue.attributes[1].value.includes("choice-btn") && typeof clickedValue.attributes[0] !== "undefined" && clickedValue.attributes[0].value === "show-answers") {
			populateAnswers();
			clickedValue.remove();
			targetDiv = document.getElementById("reload-page");
			if (typeof targetDiv !== "null" && targetDiv.classList.contains("col-md-6")) targetDiv.classList.replace("col-md-6","col-md-12");
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
	else {clearInterval(questionIntervalId); clearInterval(timerIntervalId); gameOverFunc(); return;} // call a game over function to calculate and display score } // display game over message and remove click listener and clear interval
	resetTimer();
}

function gameLoop() {
	
	nextQuestion();
	if (questionIndex < questionData.length) questionIntervalId = setInterval(nextQuestion, 15 * 1000);

}

function gameOverFunc() {
	
	gameOver = true;
	document.removeEventListener('click', clickListener);
	targetDiv = document.getElementById("next-question");
	targetDiv.remove();
	targetDiv = document.getElementById("main");
	targetDiv.remove();
	textElements.selectedAnswerText.remove();
	displayScore(calculateScore()); // displays score and win / lose message
	document.addEventListener('click', endGameClickListener);

}

document.addEventListener('click', clickListener);
timerIntervalId = setInterval(countDown, 1000);
gameLoop();