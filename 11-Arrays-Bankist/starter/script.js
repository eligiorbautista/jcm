'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* Functions */

/* Display movements */
const displayMovements = function (movements) {
  /* Remove existing data */
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // This has no options where to insert the html into the container
    // containerMovements.innerHTML += html;

    // or

    // This has options where to insert the html into the container
    /* beforebegin, afterbegin, beforeend, afterend */
    /* 
      beforebegin
      <p>
        afterbegin
        beforeend
      </p>
      afterend
    */
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/* Display Balance */
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

/* Display Summary */
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

/* Create usernames */
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

/* Display UI */
const updateUI = function (acc) {
  /* Display movements */
  displayMovements(acc.movements);

  /* Display balance */
  calcDisplayBalance(acc);

  /* Display summary */
  calcDisplaySummary(acc);
};

/* Event handler */
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  /* Prevent form from submitting */
  e.preventDefault();

  /* Check if username is existing */
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  /* Check if user's pin is correct */
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    /* Display UI and message */
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';

    /* Clear input fields */
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    /* Update UI */
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    // recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.usernmame !== currentAccount.username
  ) {
    // console.log(`Amount: `, amount);
    // console.log(`Receiver: `, recieverAcc);

    /* Doing the transfer */
    console.log(`Transfer Valid`);
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    /* Update UI */
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    /* Add movement */
    currentAccount.movements.push(amount);

    /* Update UI */
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log(`Delete`);

    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    /* Delete account */
    accounts.splice(index, 1);
    labelWelcome.textContent = 'Log in to get started';

    /* Hide UI */
    containerApp.style.opacity = 0;
  }
  /* Clear fields */
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b ', 'c', 'd', 'e'];

/* SLICE - does not mutate original array */
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);
// console.log('--------------------------------------------------------');

/* SPLICE - mutate original array */
// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
// console.log(arr);

/* REVERSE - mutate original array */
// arr = ['a', 'b ', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

/* CONCAT */
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

/* JOIN */
// console.log(letters.join(' - '));

/* AT */
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// getting the last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// for (const [index, num] of arr.entries())
//   console.log(`Number ${num} at index ${index}.`);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log('---- TRADITIONAL ----');
// for (const movement of movements) {
// for (const [index, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} : You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1} : You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---- FOREACH ----');
/* function (element, index, array) */
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1} : You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1} : You withdrew ${Math.abs(mov)}`);
//   }
// });
// 0 : function(200)
// 1 : function(450)
// 2 : function(400)
// 3 : function(3000)
// ...""
/* NOTE : FOREACH DO NOT ACCEPT BREAKS */

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
/* function (keyValue, key, map) */
// currencies.forEach(function (keyValue, key, map) {
//   console.log(`${key}: ${keyValue}`);
// });

// Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (keyValue, _, set) {
//   console.log(`${keyValue}: ${keyValue}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (arr) {
//   arr.forEach(function (age, index, _) {
//     let adultOrPuppy = age >= 3 ? 'adult' : 'puppy';
//     if (adultOrPuppy === 'adult') {
//       console.log(
//         `Dog number ${
//           index + 1
//         } is an ${adultOrPuppy}, and is ${age} years old.`
//       );
//     } else if (adultOrPuppy === 'puppy') {
//       console.log(
//         `Dog number ${index + 1} is still a puppy 🐶, and is ${age} years old.`
//       );
//     }
//   });
// };

// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];
// checkDogs(julia);
// checkDogs(kate);

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
// dogsJuliaCorrected.slice(1, 3);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach(function (dogAge, dogNumber, _) {
//     dogNumber++;
//     if (dogAge >= 3) {
//       console.log(
//         `Dog number ${dogNumber} is an adult, and is ${dogAge} years old.`
//       );
//     } else {
//       console.log(`Dog number ${dogNumber} is still a puppy 🐶.`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/* MAP */
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;
// const movementsUSD = movements.map(mov => mov * euroToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1} : You ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

/* FILTER */
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* this will return an array with true and false */
// const depositsMap = movements.map(function (mov) {
//   return mov > 0;
// });

/* this will return an array with filtered elements */
// const depositsFilter = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(depositsMap);
// console.log(depositsFilter);

// console.log(`----- Withdrawals -----`);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

/* REDUCE */
// console.log(movements);
/* accumulator -> SNOWBALL */
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i} : ${acc}`);
//   return acc + cur;
// }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

/* Maximum value */
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc;
//   } else {
//     return mov;
//   }

/* or */
// if (mov > acc) {
//   acc = mov;
// }
// return acc;
// }, movements[0 ]);
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function calcAverageHumanAge(ages) {
// const humanAges = ages.map(function (dogAge) {
//   if (dogAge <= 2) {
//     return 2 * dogAge;
//   } else {
//     return 16 + dogAge * 4;
//   }
// });
/* or */

// const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

// const adult = humanAge.filter(function (age) {
//   return age >= 18;
// });

/* or */

// const adults = humanAges.filter(age => age >= 18);

// const average = adults.reduce(function (acc, age, i, arr) {
//   return (acc + age) / arr.length;
// }, 0);
// return average;

/* or */

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   return average;
// }

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// const euroToUsd = 1.1;

/* PIPELINE */
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, index, arr) => acc + age / arr.length, 0);

// const data1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const data2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(data1, data2);

/* FIND - will return only the first element in the condition */
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(movements.filter(mov => mov < 0));
// console.log(firstWithdrawal);
// console.log(accounts);
/* Search login using find */
// const account = accounts.find(acc => (acc.owner = 'Jessica Davis'));
// console.log(account);

// const search = 'Steven Thomas Williams';

/* Using filter method */
// console.log(accounts.filter(account => account.owner === search)[0]);

/* Traditional - using for of loop */
// for (const account of accounts) {
//   if (account.owner === search) {
//     console.log(account);
//   }
// }

// console.log(movements);

/* EQUALITY */
// console.log(movements.includes(-130));

/* SOME: CONDITION - one element*/
// console.log(movements.some(mov => mov === -130));

// const anyDepositsFilter = movements.filter(mov => mov > 0);
// const anyWithdrawalsFilter = movements.filter(mov => mov < 0);
// const anyDeposits = movements.some(mov => mov > 0);
// const anyWithdrawals = movements.some(mov => mov < 0);
// console.log('Deposits Filter : ', anyDepositsFilter);
// console.log('Withdrawals Filter : ', anyWithdrawalsFilter);
// console.log('Deposits Some :', anyDeposits);
// console.log('Withdrawals Some :', anyWithdrawals);

/* EVERY - all elements*/
// console.log(
//   "Account 4's Deposits Every : ",
//   account4.movements.every(mov => mov > 0)
// );
// console.log(
//   "Account 4's Withdrawals Every : ",
//   account4.movements.every(mov => mov < 0)
// );

/* Seperate callback */
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

/* FLAT & MAP*/
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); /* Default - 1 */

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

/*  */

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
console.log(accountMovements);
console.log(allMovements);

const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(`Overal Balance : ${overalBalance}`);

/* FLAT */
const overalBalanceFlat = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(`Overal Balance (flat) : ${overalBalanceFlat}`);

/* FLATMAP */
const overalBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(`Overal Balance (flatmap) : ${overalBalanceFlatMap}`);
