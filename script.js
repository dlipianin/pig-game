"use strict";

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const name0El = document.getElementById("name--0");
const name1El = document.getElementById("name--1");

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const game0El = document.getElementById("games--0");
const game1El = document.getElementById("games--1");

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const newShowEl = document.querySelector(".fa-flip");
const rulesShowEl = document.querySelector(".fa-shake");
const holdShowEl = document.querySelector(".fa-beat");
const rollShowEl = document.querySelector(".fa-spin");

const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

// vars declaration
let scores, currentScore, activePlayer, playing;
let game0 = 0,
  game1 = 0;

// add/remove btns classes functions
const newBtnAdd = function() {
  newShowEl.classList.add("fa-flip");
}

const newBtnRemove = function() {
  newShowEl.classList.remove("fa-flip");
}

const rulesBtnAdd = function() {
  rulesShowEl.classList.add("fa-shake");
}

const rulesBtnRemove = function() {
  rulesShowEl.classList.remove("fa-shake");
}

const rollBtnAdd = function() {
  rollShowEl.classList.add("fa-spin");
}

const rollBtnRemove = function() {
  rollShowEl.classList.remove("fa-spin");
}

const holdBtnAdd = function() {
  holdShowEl.classList.add("fa-beat");
}

const holdBtnRemove = function() {
  holdShowEl.classList.remove("fa-beat");
}

// add/remove dice classes functions
const diceAdd = function() {
  diceEl.classList.add('hidden');
}

const diceRemove = function() {
  diceEl.classList.remove('hidden');
}

// disable btns function
const disableBtns = function() {
  btnRoll.setAttribute("disabled", true);
  btnHold.setAttribute("disabled", true);
}

// starting conditions function
const init = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceAdd();
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  name0El.textContent = "Player 1";
  name1El.textContent = "Player 2";

  btnRoll.removeAttribute("disabled");
  btnHold.removeAttribute("disabled");

  newBtnRemove();
  rulesBtnAdd();
  rollBtnAdd();
  holdBtnRemove();
};
init();



// winner function
const winnerPlayer = function() {
  document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  document.getElementById(`name--${activePlayer}`).textContent = "You won!";
  diceAdd();
  rollBtnRemove();
  holdBtnRemove();
  disableBtns();
  if (activePlayer === 0) {
    game0++;
    game0El.innerHTML = "Games won: " + game0;
  } else if (activePlayer === 1) {
    game1++;
    game1El.innerHTML = "Games won: " + game1;
  }
}

// switch player function
const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function() {
  newBtnAdd();
  rulesBtnRemove();
  holdBtnAdd();
  if (playing) {
    // generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceRemove();
    diceEl.src = `images/dice-${dice}.png`;
    // check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      // if current score is >= 100
      if (currentScore >= 20) {
        document.getElementById(`score--${activePlayer}`).textContent = currentScore;
        winnerPlayer();
      } else if (currentScore + scores[activePlayer] >= 20) {
        // else if current score + score is >= 100
        document.getElementById(`score--${activePlayer}`).textContent = currentScore + scores[activePlayer];
        winnerPlayer();
      }
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// holding dice functionality
btnHold.addEventListener('click', function() {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // finish the game
      playing = false;
      newBtnAdd();
      current0El.textContent = 0;
      current1El.textContent = 0;
      winnerPlayer();
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// refresh functionality
btnNew.addEventListener('click', init);
