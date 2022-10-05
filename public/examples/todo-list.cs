using System;
using System.Collections.Generic;

public class Program {

  public static List<string> list = new List<string>();

  static void Main (params string [] args) {
    Console.Clear();
    Console.WriteLine("TO DO LIST\n" + new String('-', 52));
    Console.WriteLine(list.Count == 0 ? "The list is empty." : "");
    int counter = 0;
    foreach(String item in list) {
      Console.WriteLine(++counter + ". " + item);
    }
    Console.WriteLine("\nAdd an item to the list " +
        "\n(or write a number to remove an item from the list)");
    string input = Console.ReadLine();
    int index;
    if(int.TryParse (input, out index)) {
      if(--index >= 0 && index < list.Count) { list.RemoveAt(index); }
    }
    else { list.Add(input); }
    Main ();
  }

}