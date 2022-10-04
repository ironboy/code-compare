// Import prompt library 
// for input prompts
const prompt = require('prompt-sync')({ sigint: true })

class Main {

  calculateBMI(lengthInCm, weightInKg) {
    return Math.round(10 * weightInKg /
      ((lengthInCm / 100) ** 2)) / 10.0
  }

  assessBMI(bmi) {
    return 'You are ' + (
      bmi > 30.0 ? 'big and beautiful' :
      bmi > 25.0 ? 'solidly build' :
      bmi >= 18.5 ? 'of medium weight' : 'easily carried'
    ) + '.'
  }

  inputPosNumber(question) {
    let a = prompt(question)
    let answer = +a
    return answer > 0 ?
      answer :
      this.inputPosNumber(question)
  }

  getInput() {
    console.clear()
    console.log('BMI Calculator JS (long)')
    console.log('-------------------------')
    let cm = this.inputPosNumber('Your length in centimeters: ')
    let kg = this.inputPosNumber('Your weight in kilograms: ')
    return [cm, kg]
  }

  constructor() {
    let input = this.getInput()
    let bmi = this.calculateBMI(...input)
    console.log('\nYour BMI is ' + bmi)
    console.log(this.assessBMI(bmi))
    let answer = prompt('\nAgain? (y/n) ')
    if ((/^j/i).test(answer)) {
      new Main()
    }
  }

}

// Start by creating an instance of Main
new Main()