const prompt = require('prompt-sync')({ sigint: true });

let list = [];

function main(print = console.log) {
  console.clear();
  print('TO DO LIST (JS)\n' + '-'.repeat(52));
  print(list.length == 0 ? 'The list is empty.' : '');
  print(list.map((x, i) => (i + 1) + '. ' + x).join('\n'));
  print('\nAdd an item to the list ' +
    '\n(or write a number to remove an item from the list)');
  let input = prompt();
  isNaN(input) ? list.push(input)
    : +input >= 1 && list.splice(input - 1, 1);
  main();
}

main();