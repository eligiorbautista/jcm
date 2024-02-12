/* Abstract */
const capitalizeString = function (str) {
  str = str.toLowerCase();
  const firstLetter = str[0];
  const others = str.slice(1);
  return firstLetter.toUpperCase() + others;
};

/* Higher-order function */
const transform = function (str, fn) {
  console.log('================================================');
  console.log(` String : ${str}`);
  console.log('________________________________________________');
  console.log(` Transformed in : ${fn(str)}`);
  console.log('------------------------------------------------');
  console.log(` Transformed by : ${fn.name}`);
  console.log('================================================');
};

console.clear();
transform('this is a sample string.', capitalizeString);
