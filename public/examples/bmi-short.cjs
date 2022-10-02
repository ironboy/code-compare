// Import prompt library for input prompts
const prompt = require('prompt-sync')({ sigint: true });

let calculateBMI = (lengthInCm, weigthInKg) =>
  +(weigthInKg / ((lengthInCm / 100) ** 2)).toFixed(1);

let assessBMI = bmi => 'Du är ' + (
  bmi > 30.0 ? 'fet' :
  bmi > 25.0 ? 'överviktig' :
  bmi >= 18.5 ? 'normalviktig' : 'underviktig'
) + '.';

let inputPosNumber = (question,
  answer = prompt(question)) =>
  isNaN(answer) || answer <= 0 ?
    inputPosNumber(question) : answer;

let getInput = () => {
  console.clear();
  console.log('BMI-kalkylatorn JS (short)\n' + '-'.repeat(30));
  return [
    'Ange din längd i cm: ', 'Ange din vikt i kg: '
  ].map(x => inputPosNumber(x));
}

let main = () => {
  let bmi = calculateBMI(...getInput());
  console.log(`\nDin BMI är ${bmi}\n${assessBMI(bmi)}\n`);
  if ((/^j/i).test(prompt('Igen? (j/n) '))) { main(); }
}

main();