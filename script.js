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
