'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
// const flightData = flights.split('+');

// for (const data of flightData) {
//   const [status, from, to, time] = data.split(';');
//   const output = `${status.replaceAll(
//     '_',
//     ' '
//   )} from ${from} to ${to} (${time})`;
//   console.log(
//     `${
//       output.slice(1).startsWith('Delayed')
//         ? '🔴 ' + output.slice(1).replaceAll(':', 'h')
//         : '🟢 ' + output.slice(1).replaceAll(':', 'h')
//     }`
//   );
// }

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');

button.addEventListener('click', function () {
  const textArea = document.querySelector('textarea').value;
  const arrTextArea = textArea.split('\n');
  console.log(arrTextArea);

  for (const [index, text] of arrTextArea.entries()) {
    const textArr = text.trim().split('_');
    const output = `${textArr[0]}${
      textArr[1][0].toUpperCase() + textArr[1].slice(1)
    } `;
    console.log(`${output.padEnd(20)}${'✅'.repeat(index + 1)}`);
  }
});

//////////////////////////////////////|

// Strings

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1.
// const events = [...new Set([gameEvents.values()])];
// console.log(events);

// // 2.
// gameEvents.delete(64);

// // 3.
// const time = [...gameEvents.keys()].pop();
// const message = `An event happened, on average, every ${
//   time / gameEvents.size
// } minutes`;
// console.log(message);

// // 4.
// for (const [min, event] of gameEvents) {
//   let str = min <= 45 ? 'FIRST HALF' : 'SECOND HALF';
//   console.log(`[${str}] ${min}: ${event}`);
// }

///////////////////////////////////////
// Maps iteration
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);

// Convert object to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// Quiz app
// for (const [key, value] of question)
//   if (typeof key === 'number') console.log(`${key} : ${value}`);

// const answer = Number(prompt('Your answer'));
// answer === question.get('correct')
//   ? console.log(question.get('correct'))
//   : question.get(false);
// console.log(question.get(question.get('correct') === answer));

// Convert map to array and use join method
// console.log([...question].join('\n'));
// console.log(...question.entries());
// console.log(...question.keys());
// console.log(question.values());

/////////////////////
// Maps Fundamentals
// const rest = new Map();
// rest.set('name', 'Classico');
// rest.set(1, 'Firenze, Italy');
// rest.set(2, 'Lisbon, Portugal');
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');
// console.log(rest);
// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;

// it uses boolean to get value
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// rest.clear();

const arr = [1, 2];
/* this will work */
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest.get(arr));
/* this will not work */
// rest.set([1, 2], 'Test');
// console.log(rest.get([1, 2]));

// console.log(rest);

/////////////////////////////////////
// Sets
// const orderSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(orderSet);
// console.log(orderSet.size);
// console.log(orderSet.has('Bread'));
// console.log(orderSet.has('Pasta'));
// orderSet.add('Garlic Bread');
// orderSet.add('Garlic Bread');
// orderSet.delete('Risotto');
// console.log(orderSet);

// for (const order of orderSet) console.log(order);

/* Example */
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Cheff', 'Waiter'];

// Remove all duplicates in array
// const staffUnique = new Set(staff);
// const newStaff = new Array(...staffUnique);
// console.log(newStaff);
/* or */
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);
// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Cheff', 'Waiter']).size
// );

// console.log(new Set('ellliiiiibautista').size);

// orderSet.clear();
// console.log(orderSet);

// const charSet = new Set('aabbccdd');
// console.log(charSet);

/////////////////////////////////////
// // Looping objects object keys, values, and entries
// /* Property NAMES */
// const properties = Object.keys(openingHours);
// // console.log(properties);

// let openStr = `We are open on ${properties.length} days`;

// // for (const day of Object.keys(openingHours)) {
// //   console.log(day);
// // }
// for (const day of properties) {
//   openStr += ` ${day}`;
// }
// // console.log(openStr);

// /* Property VALUES */
// const values = Object.values(openingHours);
// // console.log(values);

// /* Entire object */
// const entries = Object.entries(openingHours);
// // console.log(entries);

// /* [key, value] */
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

/////////////////////////////////////
// /* With optional chaining */
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// /* Optional chaining with methods */
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
// console.log(restaurant.orderRisoto?.(0, 1) ?? 'Method does not exist.');

// /* Optional chaining with arrays */

// const users = [
//   {
//     name: 'Jonas',
//     email: 'hello@jonas.io',
//   },
// ];

// console.log(users[2]?.name ?? 'User array empty');
// console.log(users[0]?.address ?? 'User array empty');

// ///////////////////////////////////////
// // Logical Assignment Operators
// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // OR assignment operator
// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;
// // rest1.numGuests ||= 10;
// // rest2.numGuests ||= 10;

// // nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // AND assignment operator
// // rest1.owner = rest1.owner && '<ANONYMOUS>';
// // rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// ///////////////////////////////////////
// // The Nullish Coalescing Operator
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // Nullish: null and undefined (NOT 0 or '')
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// ///////////////////////////////////////
// // Short Circuiting (&& and ||)

// console.log('---- OR ----');
// // Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('---- AND ----');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//////////////////////////////////
/* Rest patterns and parameters / opposite of spread operator */
/* 1) Destructuring */
/* SPREAD, because on RIGHT side of = */
// const arr = [1, 2, ...[3, 4]];
// /* REST, because on LEFT side of = */
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risoto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(
//   'Pizza:',
//   pizza,
//   '\n',
//   'Risoto:',
//   risoto,
//   '\n',
//   'Other Food:',
//   otherFood
// );
// /* Objects */
// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(weekDays);

// /* 2) Functions, REST arguments*/
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log('Total:', sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('hotdog');
// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

/* Summary */
/* 
The spread and rest syntax are both look exactly the same but they work in opposite ways depending when and where they are use.
The spread operator is used where we would otherwise write values seperated by a comma on the other hand the rest pattern basically used where we would otherwise write variable names seperated bycommas

The rest pattern is used where we would write variable names seperated by commas, and not values seperated by commas.
*/

// //////////////////////////////////
// /* Spread operator */
// const arr = [7, 8, 9, 10];
// const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArray);

// /* with spread operator */
// const newArr = [1, 2, ...arr];
// console.log(newArr);

// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// /* Copy array */
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// /* Join 2 arrays or more */
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// /* Iterables: arrays, strings, maps, sets, NOT objects */
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);
// console.log('j', 'o');
// // console.log(`${...str} Schmedtmann`); // this will not work

/* Real-world example */
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

/* Objects */
// const newRestaurant = {
//   foundingYear: 1998,
//   ...restaurant,
//   founder: 'Guiseppe',
// };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log('New name:', restaurantCopy.name);
// console.log('Old name:', restaurant.name);

// //////////////////////////////////
// /* Destructuring Objects */
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// /* if the deconstructuring in the function has a default value, this will not have an error */
// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
// });

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// /* change object names to a different one */
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// /* add default value, if the property object do not exist, the value will be the default value */
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// /* Mutating variables while destructuring objects */
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// // {a, b} = obj; // this wil get you an error
// ({ a, b } = obj);
// console.log(a, b);

// /* Nested objects */
// const {
//   fri: { o, c },
// } = openingHours;
// console.log('Friday', '- open:', o, ' close:', c);

//////////////////////////////////
/* Destructuring Arrays */
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// /* switching variables */
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// /* also switching variables but with destructuring*/
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// /* destructuring with function */
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// /* nested destructuring */
// const nested = [2, 4, [5, 6]];
// const [i, , [k, l]] = nested;
// console.log(i, k, l);

// /* Default values */

// const [p = 1, q = 1, r = 1] = [
//   8, 9,
// ]; /* 1 will be the default value of each variables just in case no data is found or initialize in the array/object that you are destructuring */
// console.log(p, q, r);
