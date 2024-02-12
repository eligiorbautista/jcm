const eli = {
  name: 'Eli Bautista',
  age: 21,
  greet(sex) {
    return `Hi, I'm ${this.name}, a ${this.age}-year-old ${sex}.`;
  },
};

const trina = {
  name: 'Trina Sambas',
  age: 22,
};
console.clear();

const output1 = eli.greet('male');
console.log(output1);

const greet = eli.greet;
/* call */
// const greet = eli.greet;
// const output2 = greet.call(trina, 'Female');
// console.log(output2);

/* apply */
// const arr = ['Female'];
// const output3 = greet.apply(trina, arr);
// console.log(output3);

/* call again using array*/
// const output4 = greet.call(trina, ...arr);
// console.log(output4);

/* bind */
const x = greet.bind(trina);
const output5 = x('Female');
console.log(output5);
