'use strict';

//////////////////////////////////////////////////////////////////
//////////////////////////DEFALUT PARAMETRS///////////////////////
//////////////////////////////////////////////////////////////////
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // {flightNum: 'LH123', numPassengers: 1, price: 199}

createBooking('LH123', 2, 800); // {flightNum: 'LH123', numPassengers: 2, price: 800}

createBooking('LH123', 2); // {flightNum: 'LH123', numPassengers: 2, price: 398}

createBooking('LH123', 5); // {flightNum: 'LH123', numPassengers: 2, price: 995}

createBooking('LH123', 1000); // {flightNum: 'LH123', numPassengers: 1000, price: 199000}. We could't skip parameters

createBooking('LH123', undefined, 1000); // {flightNum: 'LH123', numPassengers: 1, price: 1000} with undefined function take parameter from expression
*/

/*
//////////////////////////////////////////////////////////////////
/////////////HOW TO PASS ARGUMENTS INTO FUNCTIONS/////////////////
//////////////////////////////////////////////////////////////////

// Example
const flight = 'LH123';
const dmitriy = {
  name: 'Dmitryi Angve',
  passport: 40909402920,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; // If we trying copy object like this we are really only copying the reference to the object in the memory heap
  passenger.name = 'Mr.' + passenger.name; // If we manupulating the "dmitriy" object like this, we change it, because they both are the same object in the memory heap

  if (passenger.passport === 40909402920) {
    alert('Check in!');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, dmitriy); // LH123 {name: 'Mr.Dmitryi Angve', passport: 40909402920}. Flight still "LH123". References type!
// console.log(flight);
// console.log(dmitriy);

// Is the same as doing... If we trying copy object like this we are really only copying the reference to the object in the memory heap
// flightNum = flight
// const passenger = dmitriy;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000); // between 1 and 10000000000
};
newPassport(dmitriy); // {name: 'Mr.Dmitryi Angve', passport: 40909402920}
checkIn(flight, dmitriy); // Wrong passport

// !!!JavaScript does not have passing by reference only passing by value!!!!
// We pass a reference to the function but we do not pass by reference
*/

//////////////////////////////////////////////////////////////////
///////////////////////CALLBACK FUNCTIONS/////////////////////////
//////////////////////////////////////////////////////////////////
/*
//---------------------Generic functions-------------------

// 1. Return "str" without any spaces
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

// 2. Simply transform the first world of a string to upperCase
const upperFirstWord = function (str) {
  const [first, ...othres] = str.split(' '); // REST
  return [first.toUpperCase(), ...othres].join(' ');
};

//--------------------High-Order function---------------------
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); // "name" - function method. We'll see "Transformed by: upperFirstWord"
};

transformer('JavaScript is the best', upperFirstWord); // upperFirstWord - passing only like a value
transformer('JavaScript is the best', oneWord);

// Another example. JS uses callbacks all the time!!!
const high5 = function () {
  console.log('????');
};
document.body.addEventListener('click', high5); // hight5 - callback

['Jonas', 'Martha', 'Adam'].forEach(high5); // 3 '????'


// Practice
const myFunc = function (str) {
  return str.split('+');
};

const transform = function (str2, myFunc) {
  console.log(`Transformed by: ${myFunc(str2)}`);
};

transform('Transformde+split', myFunc);

*/
/*
//////////////////////////////////////////////////////////////////
///////////////////////CALLBACK FUNCTIONS/////////////////////////
//////////////////////////////////////////////////////////////////

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas'); // Hey Jonas
greeterHey('Dmitriy'); // Hey Dmitriy

greet('Hello')('Jonas'); // Hello Jonas

//Change into arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
const greeterHeyArr = greetArr('Hey');
greeterHeyArr('Jonas');
*/

//////////////////////////////////////////////////////////////////
/////////////////////THE CALL AND APPLY METHODS///////////////////
//////////////////////////////////////////////////////////////////
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //   book: function() {},
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ fligth: `${this.iataCode}${flightNum}`, name }); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(2), book: ??}
  },
};

lufthansa.book(239, 'Jonas'); // Jonas booked a seat on Lufthansa flight LH239
lufthansa.book(635, 'Dmitriy'); // Dmitriy booked a seat on Lufthansa flight LH635
console.log(lufthansa);

// Create a new ailrline
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // create a new method "book()". It's a copy!!!!!! It's NOT method ANYMORE

// DOES NOT WORK
// book(23, 'Sarah Williams'); // TypeError: Cannot read properties of undefined (reading 'airline'). THIS keyword point to undefined

// Call, apply, bind

// CALL METHOD
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings); // {airline: 'Eurowings', iataCode: 'EW', bookings: Array(1)}. Inside the booking array of the Eurowings object

// In this exapmle we did not call the book function ourselves. We call the "call" method, which will call the book function with the THIS KEYWORD set to eurowings (first argument of the call method)! And other arguments is the arguments of the original function (flightNum, passenger name) //  book(flightNum, name)

// For Lufthansa
book.call(lufthansa, 239, 'Dmitriy Angve'); // Dmitriy Angve booked a seat on Lufthansa flight LH239
console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), book: ??}. NOW ARRAY HAVE THREE BOOKINGS:         1. {fligth: 'LH239', name: 'Jonas'}; 2. {fligth: 'LH635', name: 'Dmitriy'}; 3. {fligth: 'LH239', name: 'Dmitriy Angve'}

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper'); // Mary Cooper booked a seat on Swiss Air Lines flight LX583

// APPLY METHOD

const flightData = [582, 'George Cooper'];
book.apply(swiss, flightData); // George Cooper booked a seat on Swiss Air Lines flight LX582
console.log(swiss); // {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(2)}

// Aplly not used in modern JavaScript
book.call(swiss, ...flightData); // Prefer use the call method

//////////////////////////////////////////////////////////////////
//////////////////////THE BIND METHOD/////////////////////////////
//////////////////////////////////////////////////////////////////

// like call bind allows to manually set this keyword for any function call (does not immediately call the function instead it returns a new function where this keyword is bound)

// BIND METHOD

// book.call(eurowings, 23, 'Sarah Williams');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams'); // Steven Williams booked a seat on Eurowings flight EW23

const bookEW23 = book.bind(eurowings, 23); // In this example "book(flightNum, name) - have preset argument: flightNum = 23
bookEW23('Jonas Schmedtmann'); // Jonas Schmedtmann booked a seat on Eurowings flight EW23
bookEW23('Martha Cooper'); // Martha Cooper booked a seat on Eurowings flight EW23

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// Here lufthansa.buyPlane.bind(lufthansa) return new function

// Partial application

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // addVAT = value => value * 0.23; THIS and string above the same (value = 0.23 set in stone!!!)

// console.log(addVAT(100)); // 123
// console.log(addVAT(23)); // 28.29

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(23));
*/
/*
//////////////////////////////////////////////////////////////////
//////////////////////CODING CHALLENGE #1/////////////////////////
//////////////////////////////////////////////////////////////////

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  rigesterNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write optional number)`
      )
    );

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    // console.log(answer);

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll result are ${this.answers.join(', ')}`);
    }
  },
};
// poll.rigesterNewAnswer();
document
  .querySelector('.poll')
  .addEventListener('click', poll.rigesterNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
*/

//////////////////////////////////////////////////////////////////
/////////////IMMEDIATELY INVOKED FUNCTION EXPRESSIONS/////////////
//////////////////////////////////////////////////////////////////

// IIFE used for hide variables from the global scope
/*
const ruOnce = function () {
  console.log('This will never run again');
};
ruOnce();

// With braces JS understands what it is just expression
//IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})(); // () - at the end indicate that the function must be called immediately

//console.log(isPrivate); // Error. Global scope does not have access to anything thats inside of the scope

// Arrow function
(() => console.log('This will ALSO never run again'))();

// Functions create scopes. One scope does not have access to variables from an inner scope.

// Block scope
{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate); // We can not access this variable
console.log(notPrivate); // 46!
*/

//////////////////////////////////////////////////////////////////
///////////////////////////CLOSURES///////////////////////////////
//////////////////////////////////////////////////////////////////
/*
// We don't create closures manually like array or object, closures simply happens automatically
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// booker - now function as well
const booker = secureBooking();

// Closure makes a function remember all the variables that existed at the function's birthplace
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers

// Any function always has access to the variable environment of the execution context in which the function was created!!!!
// Variable environment attached to the function, exactly as it was at the time and place the function was created

console.dir(booker);
*/

/*
// First example
let f;

// Function f born inside of "g" first
const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

// Function f reborn in "h"
const h = function () {
  const b = 777;

  f = function () {
    // Re-assigning also closed over the variable environment of "h"
    console.log(b * 2);
  };
};

g();
f(); // 777 * 2 = 1554
console.dir(f); // [[Scopes]]: Scopes[3]; 0: Closure: a: 23

// Re-assigning f function. If re-assign the function to a new value (777), then that old closure basically disappears!!!!!!!
h();
f(); // 46, "a" variable is inside the "backpack" of the f function!
console.dir(f); // [[Scopes]]: Scopes[3]; 0: Closure: b: 777

// CLOSURE ALWAYS MAKES SURE THAT A FUNCTION DOES NOT LOSE THE CONNECTION TO THE VARIABLES THAT WERE PRESENT AS ITS BIRTHPLACE

// Second example
// Timer
const boardPassengeres = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    // create callback function
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengeres`);
  }, wait * 1000);

  // this console.log will not wait these three seconds
  console.log(`Will starts boarding in ${wait} seconds`);
};

// The closure in fact have priority over the scope chain
const perGroup = 1000; // If we delete "const perGroup = n / 3;" We are now boarding all 180 passengers  /  There are 3 groups, each with 1000 passengeres

boardPassengeres(180, 3); // We are now boarding all 180 passengers  /  There are 3 groups, each with 60 passengeres
// boardPassengeres(240, 3);
*/

//////////////////////////////////////////////////////////////////
//////////////////////CODING CHALLENGE #2/////////////////////////
//////////////////////////////////////////////////////////////////

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  // header is a "backpack" of callback function
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'green';
  });
})();
