/*
 * Create a list that holds all of your cards
 */

/* variables */

const deck = document.querySelector('.deck');
const cards = [...document.querySelectorAll('.deck li')];
const stars = [...document.querySelectorAll('.stars li')];
const moves = document.querySelector('.moves');
const timer = document.querySelector('.timer');
let num = 0;

/* event listeners */

//event listener to start the game when the page loads
document.addEventListener('load', startGame);

//event listener for when a card is clicked
deck.addEventListener('click', showCard);


/* functions */

//start game function
function startGame() {
	//reset stars
	for (let i = 0; i < stars.length; i++) {
		stars[i].innerHTML = '<i class="fa fa-star"></i>';
	}

	//reset moves
	num = 0;
	moves.textContent = '0 Moves';

	//reset timer
	timer.textContent = '00:00';

	//flip cards
	for (let i = 0; i < cards.length; i++) {
		cards[i].setAttribute('class', 'card');
	}

	//shuffle cards
	cards = shuffle(cards);
}


//show card function
function showCard(event) {

	//show the card that was clicked
	const thisCard = event.target.classList;

	if (!thisCard.contains('open') || !thisCard.contains('match')) {
		thisCard.add('open', 'show');
		countMoves();
		addToOpen();
	}
}


//add to open cards function
function addToOpen() {

	const openCards = [];//new array for open cards

	//add open cards to the array
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].classList.contains('open') === true) {
			openCards.push(cards[i]);
		}
	}

	//check if the open cards match
	for (let i = 0; i < openCards.length; i++) {

		let cardPair = openCards[i].classList;

		if (openCards.length > 2) {
			//only two unmatched cards can be open at a time
			cardPair.remove('open', 'show');
		} else if (openCards[0].innerHTML === openCards[1].innerHTML) {
			//setTimeout adds a small delay before cards are matched
			setTimeout(function() {
				cardPair.remove('open', 'show');
				cardPair.add('match');
				addToMatched();
			}, 400);
		} else {
			//slightly longer delay, if cards do not match, so they can be memorized
			setTimeout(function() {
				cardPair.remove('open', 'show');
			}, 800);
		}
	}
}


//add to matched cards function
function addToMatched() {

	const matchedCards = [];//new array for matched cards

	//add matched cards to the array
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].classList.contains('match') === true) {
			matchedCards.push(cards[i]);
		}
	}

	//check if all cards have matched to end the game
	if (matchedCards.length === 16) {
		endGame();
	}
}


//move counter function
function countMoves() {

	num++

	if (num === 1) {
		moves.textContent = num + ' Move';
		//start the timer on the first move
		startTimer();
	} else if (num > 1) {
		moves.textContent = num + ' Moves';
		//reduce the number of stars based on number of moves
		if (num > 55) {
			stars[0].innerHTML = '<i class="fa fa-star-o"></i>';
		} else if (num > 36) {
			stars[1].innerHTML = '<i class="fa fa-star-o"></i>';
		} else if (num > 24) {
			stars[2].innerHTML = '<i class="fa fa-star-o"></i>';
		}
	}
}


//timer function
function startTimer() {

}


//end game function
function endGame() {
	//stop timer
	//open a modal window
	//add heading 'Well Done!'
	//show stars
	//show moves
	//show time
	//add replay button 'Play Again!'
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
