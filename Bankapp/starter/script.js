'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKAPP

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


//Project bankapp Description
// 1.
// Here we should always try to mention some kind of function so that we should not call global object in each time ; 
// Create an function which takes an argument(movement) and create a Html element ;
// In each iteration we will create the html element based on the movement data using template literal remove the dates
//insertAdjacentHTML("position where we ttach the string afterbegin,beforeend etc", html) 
//first thing we need to clear the given data and use it for our purpose so use containerMovements.innerhtml =''; it will clear the previous data
//difference b/w afterbegin(it will apeend one data after another like [2.3.4]  print 4 3 2 :)  ) nd beforebegin(it will apeend one data after another like [2.3.4]  print 2 3 4  )

// const movements = function (movements) {
//   containerMovements.innerHTML = '';
//   movements.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';
//     const html = `
//         <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//           <div class="movements__value">${mov}</div>
//         </div>
//     `
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// }
// movements(account1.movements)



//Coding challenge
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

//SOLUTION
// const checkDogs = function (juliaData, katesData) {
//   const juliaCorrectData = juliaData.slice(2, -2);
//   //splice
//   const bothDogsData = [...juliaCorrectData, ...katesData];
//   //concat
//   bothDogsData.forEach(function (dogdata, i) {
//     const type = dogdata >= 3 ? "adult" : 'puppy'
//     console.log(`Dog number ${i + 1} is an ${type}, and is ${dogdata} years old`)
//   })
// }
// const juliaData = [3, 5, 2, 12, 7];
// const katesData = [4, 1, 15, 8, 3];
// checkDogs(juliaData, katesData);

//Data Transformation Map reduce Filter
//Map method give brand new array original array as it is
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;
// const movementsUsd = movements.map(mov => mov * euroToUsd);
// console.log(movements);
// console.log(movementsUsd);

//here also we can access index and whole array.
//diff b/w foreach and map is that in foreach we do eact operation and console that in browser but here map will those operation and store it in to array

// const movementDescription = movements.map((mov, i) =>
//   `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrawl"}  ${Math.abs(mov)} `
// );

// console.log(movementDescription);


//Computing username 
const createUserName = function (accs) {
  accs.forEach(function (acc) { //here we use for ech because we dont want to create a new array.
    acc.username = acc.owner// be careful
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join('');
  });
}
createUserName(accounts);
console.log(accounts);


//Filter function
//it is same as forEach but it filter only those data nd store it to new array for which attached condition is satiesfied
//Regular forof loop we cant chain multiple method but in map filter we can able to add multiple chain method
//challenge for withdrawl

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposit = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposit)

const withdrawl = movements.filter(mov => mov < 0);
console.log(withdrawl)


//Reduce Method
//it is different from map and filter 
//In function parameters first : accumulator(acc,cur,i,arr)
//return acc + cur in each iteration and at the end we need to mention from where we start  to add
//iterartion and acc print in console and check 
//Normal forof loop if we do the same opertion then it might need and extra variable 
//arrow func
//after that create a function calcDisplayBalance tkes movements and add balance  and show it to browser


//Maximum value (3000) const max
