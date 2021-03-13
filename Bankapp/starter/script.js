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

//Movements based on deposite and withdrawl 


const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}


//Display Balance 
const displayBalance = function (accs) {
  accs.balance = accs.movements.reduce((acc, cur) => {
    return acc + cur;
  })
  labelBalance.textContent = `${accs.balance}€`;
};

//Display Summary income ,out and intrest
const displaySummary = function (accs) {
  const income = accs.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = `${income}€`;

  const out = accs.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = accs.movements
    .filter(mov => mov > 0)
    .map((deposit) => (accs.interestRate / 100) * deposit)
    .filter((mov, i, arr) => mov > 1) // excluding below 1%
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = `${interest}€`
}


//Computing username 
const createUserName = function (accs) {
  accs.forEach(function (acc) { //here we use for each because we dont want to create a new array.
    acc.username = acc.owner// be careful
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join('');
  });
}
createUserName(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display Balance
  displayBalance(acc);
  //display Summary
  displaySummary(acc);
}

// Event Handler on Login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  //Find the cuurent Account 
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  //Verify the pin
  if (Number(inputLoginPin.value) === currentAccount.pin) {
    //Display UI  and welcome message
    labelWelcome.textContent = 'Welcome back,' + currentAccount.owner.split(" ")[0];
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Update Ui
    updateUI(currentAccount);

  } else {
    console.log('Wrong username and password')
  }

})


//Transfer Money Lecture
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  if (amount > 0 && recieverAccount && currentAccount?.balance >= amount && recieverAccount?.username !== currentAccount.username) {
    //Doing the transfer
    console.log(currentAccount, recieverAccount);
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    //Update Ui
    updateUI(currentAccount);
  }
})


btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(inputCloseUsername.value);
  // console.log(typeof inputClosePin.value);
  // console.log(currentAccount);
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  //after that clear the input
  inputCloseUsername.value = inputClosePin.value = '';
})

























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
// const createUserName = function (accs) {
//   accs.forEach(function (acc) { //here we use for ech because we dont want to create a new array.
//     acc.username = acc.owner// be careful
//       .toLowerCase()
//       .split(" ")
//       .map(name => name[0])
//       .join('');
//   });
// }
// createUserName(accounts);
// console.log(accounts);


//Filter function
//it is same as forEach but it filter only those data nd store it to new array for which attached condition is satiesfied
//Regular forof loop we cant chain multiple method but in map filter we can able to add multiple chain method
//challenge for withdrawl

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposit = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposit)

// const withdrawl = movements.filter(mov => mov < 0);
// console.log(withdrawl)


//Reduce Method
//it is different from map and filter 
//In function parameters first : accumulator(acc,cur,i,arr)
//return acc + cur in each iteration and at the end we need to mention from where we start  to add
//iterartion and acc print in console and check 
//Normal forof loop if we do the same opertion then it might need and extra variable 
//arrow func
//after that create a function calcDisplayBalance tkes movements and add balance  and show it to browser


//without arrow function
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i) {
//   console.log(`Iteration ${i + 1} : ${acc} `)
//   return acc + cur;
// }, 100);
// console.log(balance);
// with arrow function
// console.log(movements);
// const balance = movements.reduce((acc, cur, i) => acc + cur, 0);
// console.log(balance);



//Maximum value (3000) const max
// console.log(movements);
// const max = movements.reduce((acc, mov) => {
//   if (acc < mov) {
//     return acc = mov;
//   } else {
//     return acc;
//   }
// }, movements[0]);
// console.log(max);


//coding challenge 2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK 😀

// const calcAverageHumanAge = function (dogAge) {
//   const humanAge = dogAge.map(dogAge => dogAge <= 2 ? (2 * dogAge) : (16 + (dogAge * 4)));
//   const adultAgedogs = humanAge.filter(age => age >= 18);
//   const avgHumanAge = adultAgedogs.reduce((acc, cur) => acc + cur) / adultAgedogs.length;
//   console.log(humanAge);
//   console.log(adultAgedogs);
//   console.log(avgHumanAge);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//The magic of chaining method 

//We can do multiple task at one instance 
//In map and filter since these return a new array we can call anything we want but in reduce method we cant do pipeline that process our data
//Debugging is tough but if we want to check we can check the arr in next method ex after filter if we applied map then check the array in map


//again come back to application 
//create the function calcDisplaySummary
//const incomes Euro symbol;
//const out there is no issues with negative sign 
//Intrest for each deposite we recieve 1.2% intrest
//in intrest we need to exclude the intrest which which is less that 1 %


//Chaining method has some time huge issues if we have huge arrays and chaining becomes slow we shouldn't call reverse and splice method for big appliction since these methods mutates the original array.  

///////////////////////////////////////
// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/


// const calcAverageHumanAge = function (dogAge) {
//   const humanAge = dogAge
//     .map(dogAge => dogAge <= 2 ? (2 * dogAge) : (16 + (dogAge * 4)))
//     .filter(age => age >= 18)
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//   console.log(humanAge);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);


// Find Method 
// This method retrive one element from the array based on the condition which is satisfied by the array
//In this method it looks similar to filter but it wont create a new array instead of that it find the first element for which the condition is satisfied.
//Ex = const firstWithdrawl = movements.find(mov=>mov<0);
//console.log(accounts);
//const account = accounts.find(acc => acc.owner==='Jessica Davis');

//Implementing Login Lecture


//Event handler forLOGIN Lecture

// let currentAccount

//bcoz later we have have to use in which account we have transfer the money
//

// btnLogin.addEventListener('click',function(){
//   console.log("Login")// It flash in the console once we press enter or login button but we try to avoid do below  task
// })

// btnLogin.addEventListener('click', function (e) {
//   e.preventDefault();

//   currentAccount = accounts.find(
//     acc => acc.username === inputLoginPinUsername.value
//   );
//   console.log(currentAccount);

//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     //Display Ui message
//     // labelWelcome with current Name
//     // continerApp.style.opacity = 100;
//     //inputloginusername.value = inputloginpin.value ='';
//     //but cursor is still blinkinking so to avoid that use blur in inputloginpin

//     //Display Movements
//     //displayMovent method based on current user

//     //Display Balance
//     //displayBalance based on current user

//     //Display summary 
//     //displaySummary based on current user
//     //here intrest rate is different for all the cccounts so we need to passthe acc parameter to the function based on that we have to create the dynamic intrest.
//   }

// })


//Transfer Money Lecture
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  //Take amount from Ui const amount;
  //Take receiverAccount Name from ui const receiverAccount
  //check whether display correct or not
  //So we need to add certain condition suppose in account only 3000 is there and he wants to transfer 5000

  // Clear the input once every thing is finished

  //check balance it is not stored to object so we pass the acc to balance and add the property balance to the object
  //and checking amount>0 and recieverAccount and current Account.blance>=amount adnd also recieverAccountAcc?.username !=== currentAccount.username.
  //Doint the transfer
  // currentAccount.movemets.push(-amount);
  // receiverAcc.movements.push(amount);
  //Create a modular function to  updateUi();

})

//Close ACCOUNT nd findINDEx Method Lecture 

//FindIndex method 
//it will return the index of find element not the element

//so in out application if someone want to delete his account then we know we want splice method which need index


// btnClose.addEventListener(function (e) {
//   e.preventDefault();
//   console.log("delete");
//   //Match the credential first and pin 
//   //findindex for the current account  const index
//   //accounts splice 
//   //hide the ui 
//   //after that clear the input 
// })


//Some and every lecture

//include method check for equality but if we want to check condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// console.log(movements.includes(-130));

//if we want to check whether is there any positive movements or up to some greater amount 

//We can also check for equality 
// console.log(movements.some(mov => mov === -130));
// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

// Need to do
// Now go to BankApp apllication
// Request loan 
// Click button
// check amount greater than zero and movement greater the 0.1percent 
//push that value in movements 
//update ui
//clesr input field 


// Every Method
//it check all the elemts present in the array sties fies the condition 

console.log(movements.every(mov => mov > 0));

//Here we cn call every object with ease 
const deposit = mov => mov > 0;
console.log(movements.some(deposit));

//Flat and FlatMap
//Flat flattened athe given nested array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
//Flat Mthod only go 1 level deep
console.log(arrDeep.flat(2));
// now it goes 2 level deep

//Now we want overall sum for the given movements of ccount array
//flat
const overAllSum = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overAllSum);


//now using map metod and flatting the results are very common
//flatmap
const overAllSum2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overAllSum2);

//one cons of flatMap is it only goes one level deep