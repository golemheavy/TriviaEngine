let gameOver = false;


function clickListener(event) {
	if (gameOver) {document.removeEventListener('click', clickListener); return; }
	var clickedValue = event.target;
	console.log(clickedValue);
}

document.addEventListener('click', clickListener);