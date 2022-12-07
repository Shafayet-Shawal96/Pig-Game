'use strict';

const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');
const player1GlobalScoreEle = document.getElementById('score--0');
const player2GlobalScoreEle = document.getElementById('score--1');
const player1CurrentScoreEle = document.getElementById('current--0');
const player2CurrentScoreEle = document.getElementById('current--1');
const player1ActiveEl = document.querySelector('.player--0');
const player2ActiveEl = document.querySelector('.player--1');

let rollDice;
let player1Global = 0;
let player2Global = 0;
let player1Current = 0;
let player2Current = 0;
let player1Turn = true;

btnRollEl.onclick = () => {
  rollDice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${rollDice}.png`;
  if (rollDice === 1) {
    toggleTurn();
  } else {
    if (player1Turn) {
      player1Current += rollDice;
      player1CurrentScoreEle.innerText = player1Current;
    } else {
      player2Current += rollDice;
      player2CurrentScoreEle.innerText = player2Current;
    }
  }
};

const updateGlobalEle = () => {
  player1GlobalScoreEle.innerText = player1Global;
  player2GlobalScoreEle.innerText = player2Global;
};

const updateCurrentEle = () => {
  player1CurrentScoreEle.innerText = 0;
  player2CurrentScoreEle.innerText = 0;
};

btnHoldEl.onclick = () => {
  player1Global += player1Current;
  player2Global += player2Current;
  updateGlobalEle();
  if (player1Global >= 100) {
    player1ActiveEl.classList.add('player--winner');
  } else if (player2Global >= 100) {
    player2ActiveEl.classList.add('player--winner');
  }
  toggleTurn();
};

const toggleTurn = () => {
  player1Turn = !player1Turn;
  if (player1Turn) {
    player2ActiveEl.classList.remove('player--active');
    player1ActiveEl.classList.add('player--active');
  } else {
    player1ActiveEl.classList.remove('player--active');
    player2ActiveEl.classList.add('player--active');
  }
  player1Current = 0;
  player2Current = 0;
  updateCurrentEle();
};

btnNewEl.onclick = () => {
  player1Global = 0;
  player2Global = 0;
  player1Current = 0;
  player2Current = 0;
  player1Turn = true;
  player1GlobalScoreEle.innerText = 0;
  player2GlobalScoreEle.innerText = 0;
  player1CurrentScoreEle.innerText = 0;
  player2CurrentScoreEle.innerText = 0;
  player2ActiveEl.classList.remove('player--active');
  player1ActiveEl.classList.add('player--active');
  player1ActiveEl.classList.remove('player--winner');
  player2ActiveEl.classList.remove('player--winner');
};
