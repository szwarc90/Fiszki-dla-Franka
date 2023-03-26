function showCreateCardBox() {
    document.querySelector(".create-box").style.display = "block";
  }

function hideCreateBox() {
	document.querySelector(".create-box").style.display = "none";
}

function toggleFlashcard(cardId) {
	return function() {
		const flashcard = document.getElementById(cardId);
		if(flashcard.classList.contains('flashcard-hide-answer')) {
			flashcard.classList.add("flashcard-show-answer");
			flashcard.classList.remove("flashcard-hide-answer");
		} else {
			flashcard.classList.remove("flashcard-show-answer");
			flashcard.classList.add("flashcard-hide-answer");
		}
	}
}

function removeFlashcard(cardId) {
	return function(event) {
		const flashcard = document.getElementById(cardId);
		flashcard.remove();
		event.stopPropagation();
	}
}

function addFlashcard() {
	const question = document.querySelector("#question").value;
	const answer = document.querySelector("#answer").value;

	const flashcard = document.createElement("div");
	flashcard.classList.add("flashcard");
	flashcard.classList.add("flashcard-hide-answer");

	const questionEl = document.createElement("h3");
	questionEl.textContent = question;

	const answerEl = document.createElement("p");
	answerEl.textContent = answer;

	const flashcardId = "#" + Date.now(); 

	const removeButtonEl = document.createElement("button");
	removeButtonEl.textContent = "X";
	removeButtonEl.onclick = removeFlashcard(flashcardId);
	removeButtonEl.classList.add("flascard-remove-button");

	flashcard.id = flashcardId;
	flashcard.onclick = toggleFlashcard(flashcardId)
	flashcard.appendChild(questionEl);
	flashcard.appendChild(answerEl);
	flashcard.appendChild(removeButtonEl);
	document.querySelector(".flashcards-container").appendChild(flashcard);

	document.querySelector("#question").value = "";
	document.querySelector("#answer").value = "";

}
  
function delFlashcards() {
	document.querySelector(".flashcards-container").innerHTML = "";
}