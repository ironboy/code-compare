// Import prompt library 
// for input prompts
const prompt = require('prompt-sync')({ sigint: true })

class Main {

  calculateBMI(lengthInCm, weightInKg) {
    return Math.round(10 * weightInKg /
      ((lengthInCm / 100) ** 2)) / 10.0
  }

  assessBMI(bmi) {
    return 'Du är ' + (
      bmi > 30.0 ? 'fet' :
        bmi > 25.0 ? 'överviktig' :
          bmi >= 18.5 ? 'normalviktig' : 'underviktig'
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
    console.log('BMI-kalkylatorn JS (long)')
    console.log('-------------------------')
    let cm = this.inputPosNumber('Ange din längd i cm: ')
    let kg = this.inputPosNumber('Ange din vikt i kg: ')
    return [cm, kg]
  }

  constructor() {
    let input = this.getInput()
    let bmi = this.calculateBMI(...input)
    console.log('\nDin BMI är ' + bmi)
    console.log(this.assessBMI(bmi))
    let answer = prompt('\nIgen? (j/n) ')
    if ((/^j/i).test(answer)) {
      new Main()
    }
  }

}

// Start by creating an instance of Main
new Main()