"use strict";

function number() {
    const min = 1;
    const max = 6;
    return parseInt(Math.random() * (max - min) + min);
}

let currentPlayer = 0;

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

const switchPlayers = () => {
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove(`player--active`);

    currentPlayer = currentPlayer == 0 ? 1 : 0;

    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add(`player--active`);
};

let win = false;

btnRoll.addEventListener("click", function () {
    if (win == true) return;

    let points = number();
    let score = document.querySelector(`#score--${currentPlayer}`);
    let current = document.querySelector(`#current--${currentPlayer}`);

    dice.setAttribute("src", `public/${points}.png`);
    if (points == 1) {
        score.textContent = 0;
        score = document.querySelector(`#score--${currentPlayer}`);
        switchPlayers();
    } else {
        score.textContent = parseInt(score.textContent) + points;
        let score_total =
            parseInt(current.textContent) + parseInt(score.textContent);
        if (score_total >= 50) {
            const winner = document.querySelector(`.player--${currentPlayer}`);

            winner.classList.add("player--winner");
            current.textContent = 0;
            score.textContent = score_total;

            win = true;

            return;
        }
    }
});

btnHold.addEventListener("click", function () {
    if (win) return;

    let current = document.querySelector(`#current--${currentPlayer}`);
    let score = document.querySelector(`#score--${currentPlayer}`);

    current.textContent =
        parseInt(current.textContent) + parseInt(score.textContent);
    score.textContent = 0;

    switchPlayers();
});

document.querySelector(".btn--new").addEventListener("click", function () {
    const scores = document.querySelectorAll('.score');
    const currentScores = document.querySelectorAll('.current-score');
    
    const players = document.querySelectorAll('.player');

    currentPlayer = 0;
    win = false;

    scores.forEach(score => score.textContent = 0);
    currentScores.forEach(current => current.textContent = 0);
    players.forEach(player => {
        if(player.classList.contains('player--winner'))
            player.classList.remove('player--winner');

        if(player.classList.contains('player--active'))
            player.classList.remove('player--active');
    })

    players[0].classList.add('player--active');
});
