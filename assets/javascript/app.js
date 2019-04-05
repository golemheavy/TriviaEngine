let gameOver = false;
let targetDiv = null;
let questionIndex = 0;
let questionInterval = null;

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
		correctAnswerIndex: 0
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
		correctAnswerIndex: 0
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
	answerButtonFour	: document.getElementById("choice-4") // next-question
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
				clearInterval(questionInterval);
				//questionIndex++;
				gameLoop();
				// nextQuestion();
				// questionInterval = setInterval(nextQuestion, 15 * 1000);
			}
		}
	}
}

function nextQuestion() {
	
	//need to deactivate selected button here
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
	else {clearInterval(questionInterval); return; gameOver = true; // call a game over function to calculate and display score } // display game over message and remove click listener and clear interval
}

function gameLoop() {
	
	nextQuestion();
	questionInterval = setInterval(nextQuestion, 15 * 1000);
}

document.addEventListener('click', clickListener);
gameLoop();