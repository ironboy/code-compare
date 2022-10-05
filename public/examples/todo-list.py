from os import system, name as os_name

list = []

def main():
  system('cls' if os_name == 'nt' else 'clear')
  print('\n' * 60 + 'TO DO LIST (Python)\n' + '-' * 50)
  print('The list is empty' if len(list) == 0 else '')
  for a, b in enumerate(list, 1): print (str(a) + '. ' + b)
  print('\nAdd an item to the list ' +
    '\n(or write a number to remove an item from the list)')
  _input = input()
  if not _input.isnumeric(): list.append(_input)
  elif int(_input) - 1 in range(0, len(list)): 
    list.pop(int(_input) - 1)
  main()

main()