'use strict';
/* 
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
 */
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  var guess = document.querySelector('.guess').value;
  guess = parseInt(guess);
  console.log(guess, typeof guess);

  /* When there is no input */
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔ No number!';
    displayMessage('⛔ No number!');

    /* When player wins */
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    /* Update highscore */
    if (score > highscore) {
      highscore = score;
    }
    document.querySelector('.highscore').textContent = highscore;

    /* When guess is wrong */
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      // document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too Low';
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too Low');
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
  /* When guess is too high */
  //   } else if (guess > secretNumber) {
  //     if (score > 1) {
  //       score--;
  //       document.querySelector('.message').textContent = '📈 Too high!';
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '💥 You lost the game!';
  //       document.querySelector('.score').textContent = 0;
  //     }

  //     /* When guess is too low */
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       score--;
  //       document.querySelector('.message').textContent = '📉 Too low!';
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '💥 You lost the game!';
  //       document.querySelector('.score').textContent = 0;
  //     }
});

document.querySelector('.again').addEventListener('click', function () {
  /* Reset number, score */
  score = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;

  /* Reset message to default text*/
  displayMessage('Start guessing...');

  /* Reset background color of the body and width of the number */
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});
