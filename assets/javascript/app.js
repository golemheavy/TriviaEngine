let gameOver = false;
let targetDiv = null;


var textElements = {
	selectedAnswerText : document.getElementById("selected-answer")
};


function clickListener(event) {
	if (gameOver) { document.removeEventListener('click', clickListener); return; } // also need to display game over message
	var clickedValue = event.target;
	if (clickedValue.attributes[1]) {
		if (clickedValue.attributes[1].value.includes("choice-btn")) console.log(true);
		if (clickedValue.attributes[0]) {
			targetDiv = document.getElementById(clickedValue.attributes[0].value);
			console.log(targetDiv.innerHTML);
			textElements.selectedAnswerText.textContent = "You selected: " + targetDiv.innerHTML;
			
		}
	}
}

document.addEventListener('click', clickListener);