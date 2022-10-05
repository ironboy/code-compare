// Import our own function
// that makes creating a new window easier
// (and adds a button to launch the new window)
import { createWindow } from './window-handling.js';
// Create a shorthand alias for selecting an html element
let $ = x => document.querySelector(x);

// Function for calculating BMI (as an arrow function)
let calculateBMI = (lengthInCm, weigthInKg) =>
  +(weigthInKg / ((lengthInCm / 100) ** 2)).toFixed(1);

// Function for assessing BMI (as an arrow function)
let assessBMI = bmi => 'You are ' + (
  bmi > 30.0 ? 'big and beautiful' :
  bmi > 25.0 ? 'solidly built' :
  bmi >= 18.5 ? 'of medium weight' : 'easily carried'
) + '.';

// Function to run when clicking the calculate button:
// get the values of input fields, calculate and show result
function calculate() {
  let result = calculateBMI(
    +$('.cm').value,
    +$('.kg').value
  );
  result = !result || isNaN(result) ?
    'hard to calculate.' : result;
  $('.result').innerHTML = 'Your BMI is ' + result;
  $('.assess').innerHTML = (result + '').includes('hard') ?
    '' : assessBMI(result);
}

// Create GUI: Create a window + define HTML elements
let health_icon_image = 'health-icon.png';
createWindow($, 'BMI Calculator (JavaScript)', 75, 30, /*html*/`
  <img style="margin-top:15px" src="${health_icon_image}">
  <h3>BMI Calculator</h3>
  <label>Your length in centimeters:
    <input class="cm" type="number">
  </label>
  <label>Your weight in kilograms:
    <input class="kg" type="number">
  </label>
  <button class="calculate">
    Calculate your BMI</button>
  <h4 class="result"></h4>
  <h4 class="assess"></h4>
`);
// Add an event listener to the calculate button
$('.calculate').addEventListener('click', calculate);

// Focus the first 
// input element
$('.cm').focus();