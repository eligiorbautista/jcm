'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  if (
    modal.classList.contains('hidden') &&
    overlay.classList.contains('hidden')
  ) {
    modal.classList.remove('hidden', 'anotherClass');
    overlay.classList.remove('hidden');
  }
};

const closeModal = function () {
  if (
    !modal.classList.contains('hidden') &&
    !overlay.classList.contains('hidden')
  ) {
    modal.classList.add('hidden', 'anotherClass');
    overlay.classList.add('hidden');
  }
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

/* Global Events / Key Events */
document.addEventListener('keydown', function (e) {
  console.log(e);
  console.log(`Key ${e.key} is pressed.`);

  if (e.key === 'Escape') {
    closeModal();
  }
});
