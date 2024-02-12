'use strict';

// function calcAge(birthYear) {
//   const age = 2024 - birthYear;

//   function printAge() {
//     const output = `You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str);
//     console.log(millenial);
//   }

//   printAge();
//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);
// // console.log(age);
// // printAge();

/* Variables */
// console.log(me);
// console.log(job);
// console.log(year);

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

/* Functions */

// console.log(addDecl(2, 3));
// // console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

// function addDecl(a, b) {
//   return a + b;
// }

// var addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

/* Example */
// console.log(undefined);

// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

// const jonas = {
//   name: 'Jonas',
//   year: 1989,
//   caclAge: function () {
//     return 2024 - this.year;
//   },
// };

// console.log(jonas.caclAge());

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(2037 - this.year);
//   },
// };

// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge();

// const f = jonas.calcAge;
// f();

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(2037 - this.year);
//     /* Solution 1 */
//     // const self = this;
//     // const isMillenial = function () {
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     // };
//     // isMillenial();

//     /* Solution 2 */
//     const self = this;
//     const isMillenial = () => {
//       console.log(this);

//       console.log(self.year >= 1981 && self.year <= 1996);
//     };
//     isMillenial();
//   },

//   greet: () => console.log(`Hey ${this.firstName}`),
// };

// jonas.greet();
// jonas.calcAge();

// /* arguments keyword */
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpr(2, 5, 8); // no error

// const addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// addArrow(2, 5, 8); // with error

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend', friend);
// console.log('Me', me);
console.log('Primitive types\n----------------------------------------');
/* Primitive types */
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);
console.log('----------------------------------------');

console.log('\n\nReference types\n----------------------------------------');
/* Reference types */
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);
/* marriedJessica */
console.log('----------------------------------------');

/* Copying objects */
console.log('\n\nCopying objects\n----------------------------------------');
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['John', 'Mary'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Gio');
jessicaCopy.family.push('Stella');
jessicaCopy.family.push('Eli');
// jessicaCopy.family.pop('John');
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);

console.log('----------------------------------------');
