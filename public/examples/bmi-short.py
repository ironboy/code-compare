# Import re for reg ex, os parts for correct clear
import re; from os import system, name as os_name

calculate_BMI = lambda lengthInCm, weigthInKg:\
  round(weigthInKg / ((lengthInCm / 100) ** 2), 1)

assess_BMI = lambda bmi: 'You are ' + (
  'big and beautiful' if bmi > 30.0 else
  'solidly build' if bmi > 25.0 else
  'of medium weight' if bmi >= 18.5 else 'easily carried'
) + '.'

def input_pos_number(question):
  answer = input(question)
  return float(answer) if re.match(r'\d+\.*\d*', answer)\
    and float(answer) > 0 else input_pos_number(question)

def get_input():
  system('cls' if os_name == 'nt' else 'clear')
  print('BMI Calculator Python (short)\n' + '-' * 30)
  return map(input_pos_number, [
    'Your length in centimeters: ', 
    'Your weight in kilograms: '
  ])

def main():
  bmi = calculate_BMI(*get_input())
  print(f'\nYour BMI is {bmi}\n{assess_BMI(bmi)}\n')
  if re.match(r'(?i)^y', input('Again? (y/n)')):
    main()

main()