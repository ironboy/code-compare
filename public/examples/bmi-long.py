# Import re for reg ex, os parts for correct clear
import re; 
from os import system, name as os_name

class Main:

  def calculate_BMI(self, lengthInCm, weigthInKg):
    return round(
      weigthInKg /
      ((lengthInCm / 100) ** 2),
    1)

  def assess_BMI(self, bmi): 
    return 'Du är ' + (
      'fet' if bmi > 30.0 else
      'överviktig' if bmi > 25.0 else
      'normalviktig' if bmi >= 18.5 else 
      'underviktig'
    ) + '.'

  def input_pos_number(self, question):
    answer = input(question)
    if re.match(r'\d+\.*\d*', answer)\
      and float(answer) > 0:
      return float(answer)
    else:
      return self.input_pos_number(question)

  def get_input(self):
    system('cls' if os_name == 'nt'\
      else 'clear')
    print('BMI-kalkylatorn Python (long)')
    print('-----------------------------')
    cm = self.input_pos_number('Ange din längd i cm: ')
    kg = self.input_pos_number('Ange din vikt i kg: ')
    return [cm, kg]

  def __init__(self):
    answers = self.get_input()
    bmi = self.calculate_BMI(*answers)
    print('\nDin BMI är ' + str(bmi))
    assessment = self.assess_BMI(bmi)
    print(assessment)
    answer = input('\nIgen? (j/n) ')
    regex = r'(?i)^j'
    if re.match(regex, answer):
      Main()

# Start the program
# by creating a new instance of the Main class
Main()