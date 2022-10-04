// Import prompt library for input prompts
const prompt = require('prompt-sync')({ sigint: true })

let calculateBMI = (lengthInCm, weigthInKg) =>
  +(weigthInKg / ((lengthInCm / 100) ** 2)).toFixed(1)

let assessBMI = bmi => 'You are ' + (
  bmi > 30.0 ? 'big and beautiful' :
  bmi > 25.0 ? 'solidly build' :
  bmi >= 18.5 ? 'of medium weight' : 'easily carried'
) + '.'

let inputPosNumber = (question,
  answer = prompt(question)) =>
  isNaN(answer) || answer <= 0 ?
    inputPosNumber(question) : answer

let getInput = () => {
  console.clear()
  console.log('BMI Calculator JS (short)\n' + '-'.repeat(30))
  return [
    'Your length in centimeters: ', 'Your weight in kilograms: '
  ].map(x => inputPosNumber(x))
}

let main = () => {
  let bmi = calculateBMI(...getInput())
  console.log(`\nYour BMI is ${bmi}\n${assessBMI(bmi)}\n`)
  if ((/^y/i).test(prompt('Again? (y/n) '))) { main() }
}

main()