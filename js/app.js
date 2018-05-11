/**
 * Matching Game JS
 */

/* variables */
const popupStart = document.querySelector('.popup-start');//popup when the page loads
const popupEnd = document.querySelector('.popup-end');//popup at the end of the game
const start = [...document.querySelectorAll('.start-btn')];//array of buttons
const stars = [...document.querySelectorAll('.stars li')];//array of stars
const moves = document.querySelector('.moves');//move counter
const timer = document.querySelector('.timer');//stopwatch
const deck = document.querySelector('.deck');//game board
let cards = [...document.querySelectorAll('.deck li')];//array of cards
let num = 0;//moves
let sec = 0;//stopwatch seconds
let min = 0;//stopwatch minutes
let setTimer = '';//setTimer variable


/* functions */

//event listener for buttons
start.forEach(function(button) {
	button.addEventListener('click', startGame);
});

//shuffle function for the cards (http://stackoverflow.com/a/2450976)
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

///reset the game board
function startGame() {

	//event listener for when a card is clicked
	deck.addEventListener('click', showCard);

	//hide popups
	popupStart.setAttribute('style', 'display: none');
	popupEnd.setAttribute('style', 'display: none');

	//reset stars
	stars.forEach(function(star) {
		star.innerHTML = '<i class="fa fa-star"></i>';
	});

	//reset timer
	clearInterval(setTimer);
	sec = 0;
	min = 0;
	timer.textContent = '00:00';

	//reset moves
	num = 0;
	moves.textContent = '0';

	//shuffle cards
	shuffle(cards);

   	//loop through each card
	cards.forEach(function(card) {
		//flip each card
		card.setAttribute('class', 'card');
		//add each card's HTML to the page
        deck.appendChild(card);
    });
}

//show the card, if it's not open or matched
function showCard(event) {

	const thisCard = event.target.classList;

	if (thisCard.contains('show') || thisCard.contains('match')) {
		event.preventDefault();//stop counting moves when an open or matched card is clicked
	} else if (!thisCard.contains('show') || !thisCard.contains('match')) {
		thisCard.add('open', 'show');
		countMoves();
		addToOpen();
	}
}

//add card to open cards array and check if open cards match
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

		const cardPair = openCards[i].classList;

		if (openCards.length > 2) {
			//only two unmatched cards can be open at a time
			cardPair.remove('open', 'show');
		} else if (openCards[0].innerHTML === openCards[1].innerHTML) {
			//add a small delay before cards are matched
			setTimeout(function() {
				cardPair.remove('open', 'show');
				cardPair.add('match');
				addToMatched();
			}, 400);
		} else {
			cardPair.add('hide');
			//add a slightly longer delay, if cards do not match, so they can be memorized
			setTimeout(function() {
				cardPair.remove('hide', 'open', 'show');
			}, 800);
		}
	}
}

//add cards to matched cards array and end the game if all cards have matched
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

//count moves by counting how many times cards are clicked
function countMoves() {

	num++;
	moves.textContent = num;

	if (num === 1) {
		//start the stopwatch on the first move
		startTimer();
	} else if (num > 1) {
		//reduce the number of stars based on number of moves
		if (num > 99) {
			endGame();//moves limit for game
		} else if (num > 44) {
			stars[0].innerHTML = '<i class="fa fa-star-o"></i>';
		} else if (num > 36) {
			stars[1].innerHTML = '<i class="fa fa-star-o"></i>';
		} else if (num > 24) {
			stars[2].innerHTML = '<i class="fa fa-star-o"></i>';
		}
	}
}

//stopwatch function
function startTimer() {

	//increment time per second
	setTimer = setInterval(time, 1000);

	function time() {
		sec++;

		if (sec == 60) {
			sec = 0;
			min++;
		} else if (min == 1) {
			sec = 0;
			endGame();//time limit for game
		}

		//display time in 00:00 format
		if (sec < 10 && min < 10 ) {
			timer.textContent = '0' + min + ':0' + sec;
		} else if (sec < 10 && min > 10) {
			timer.textContent = min + ':0' + sec;
		} else if (sec >= 10 && min < 10) {
			timer.textContent = '0' + min + ':' + sec;
		} else {
			timer.textContent = min + ':' + sec;
		}
	}
}


//end the game and set the score
function endGame() {
	//stop timer
	clearInterval(setTimer);
	//remove event listener so no more moves can be made
	deck.removeEventListener('click', showCard);
	//open popup
	showScore();
}

//show the score and message at the end of the game
function showScore() {

	const message = document.querySelector('.popup-message');
	const text = document.querySelector('.popup-text');

	//show the popup
	setTimeout(function() {
		popupEnd.setAttribute('style', 'display: initial');
	}, 1000);

	//show time score
	document.querySelector('.total-time').textContent = timer.textContent;

	//show star score
	document.querySelector('.total-stars').innerHTML = stars[0].innerHTML + ' ' + stars[1].innerHTML + ' ' + stars[2].innerHTML;

	//show a different message depending on score
	if (min === 1) {
		message.textContent = 'Game over!';
		//replace stars with x
		document.querySelector('.total-stars').innerHTML = '<i class="fa fa-times"></i><i class="fa fa-times"></i><i class="fa fa-times"></i>';
		text.textContent = 'You\'re out of time';
	} else if (num > 36) {
		message.textContent = 'Good effort!';
		text.textContent = 'Practice makes perfect';
	} else if (num > 24) {
		message.textContent = 'Well Done!';
		text.textContent = 'Almost perfect score';
	} else {
		message.textContent = 'Masterful!';
		text.textContent = 'Your memory is impeccable';
	}
}