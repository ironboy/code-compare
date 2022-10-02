# Import re for reg ex, os parts for correct clear
import re; from os import system, name as os_name

calculate_BMI = lambda lengthInCm, weigthInKg:\
  round(weigthInKg / ((lengthInCm / 100) ** 2), 1)

assess_BMI = lambda bmi: 'Du är ' + (
  'fet' if bmi > 30.0 else
  'överviktig' if bmi > 25.0 else
  'normalviktig' if bmi >= 18.5 else 'underviktig'
) + '.'

def input_pos_number(question):
  answer = input(question)
  return float(answer) if re.match(r'\d+\.*\d*', answer)\
    and float(answer) > 0 else input_pos_number(question)

def get_input():
  system('cls' if os_name == 'nt' else 'clear')
  print('BMI-kalkylatorn Python (short)\n' + '-' * 30)
  return map(input_pos_number, [
    'Ange din längd i cm: ', 
    'Ange din vikt i kg: '
  ])

def main():
  bmi = calculate_BMI(*get_input())
  print(f'\nDin BMI är {bmi}\n{assess_BMI(bmi)}\n')
  if re.match(r'(?i)^j', input('Igen? (j/n)')):
    main()

main()