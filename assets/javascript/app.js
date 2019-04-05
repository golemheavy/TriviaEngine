let gameOver = false;
let targetDiv = null;

// trivia questions lifted from:
// http://www.usefultrivia.com/tv_trivia/star_trek_trivia_index.html
const questionData = [

	{
		question:	"In Gene Roddenberry's original treatment for Star Trek, what was the name of the Starship?",
		answers:	["Yorktown","Plymouth","Reliant","Enterprise"],
		correctAnswerIndex: 0
	},
	
	{
		question:	"What is Sulu's primary position on the U.S.S. Enterprise?",
		answers:	["Helmsman","Science Officer","Navigator","Chief Engineer"],
		correctAnswerIndex: 0
	},

	{
		question:	"Which Star Trek captain has an artificial heart?",
		answers:	["Jonathan Archer","Benjamin Sisko","Jean-Luc Picard","Kathryn Janeway"],
		correctAnswerIndex: 2
	},

	{
		question:	"Who was the first Vulcan science officer aboard the starship Enterprise?",
		answers:	["Spock","T'pol","Tuvok","Sarek"],
		correctAnswerIndex: 1
	},

	{
		question:	"Which alien race did Ronald Reagan say reminded him of Congress?",
		answers:	["Borg","Vulcans","Klingons","Ferengi"],
		correctAnswerIndex: 0
	},
	
	{
		question:	"Which species was the first to discover warp drive?",
		answers:	["Klingons","Humans","Borg","Vulcans"],
		correctAnswerIndex: 3
	},

	{
		question:	"Which Star Trek actor originally devised the Klingon language?",
		answers:	["Michael Ansara","James Doohan","Mark Lenard","Leonard Nimoy"],
		correctAnswerIndex: 0
	},

	{
		question:	"What character was adopted by the Vulcan ambassador Sarek?",
		answers:	["Spock","Sybok","Sylvia Tilly","Michael Burnham"],
		correctAnswerIndex: 0
	}

];

var textElements = {
	selectedAnswerText	: document.getElementById("selected-answer"),
	questionText		: document.getElementById("question-text"),
	answerButtonOne		: document.getElementById("choice-1"),
	answerButtonTwo		: document.getElementById("choice-2"),
	answerButtonThree	: document.getElementById("choice-3"),
	answerButtonFour	: document.getElementById("choice-4")
};


function clickListener(event) {
	if (gameOver) { document.removeEventListener('click', clickListener); return; } // also need to display game over message
	var clickedValue = event.target;
	if (clickedValue.attributes[1]) {
		if (clickedValue.attributes[1].value.includes("choice-btn")) {
			if (clickedValue.attributes[0].value !== "undefined") {
				targetDiv = document.getElementById(clickedValue.attributes[0].value);
				textElements.selectedAnswerText.textContent = "You selected: " + targetDiv.innerHTML;
			}
		}
	}
}

function gameLoop() {
	
	for (var x = 0; x < questionData.length && !gameOver; x++) {

		textElements.questionText.textContent = questionData[x].question;
		textElements.answerButtonOne.textContent = questionData[x].answers[0];
		textElements.answerButtonTwo.textContent = questionData[x].answers[1];
		textElements.answerButtonThree.textContent = questionData[x].answers[2];
		textElements.answerButtonFour.textContent = questionData[x].answers[3];
	}
}

document.addEventListener('click', clickListener);
gameLoop();