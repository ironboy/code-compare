import java.util.*;

public class Main {

  private static Scanner in = new Scanner(System.in);
  private static ArrayList<String> list = new ArrayList<>();

  public static void main(String... args) {
    System.out.println("\n".repeat(60));
    System.out.println("TO DO LIST (Java)\n" + "-".repeat(52));
    System.out.println(list.size() == 0 ? "The list is empty." : "");
    int counter = 0;
    for(String item : list){
      System.out.println(++counter + ". " + item);
    }
    System.out.println("\nAdd an item to the list " +
        "\n(or write a number to remove an item from the list)");
    String input = in.nextLine();
    if(input.matches("\\d+")){
      int index = Integer.parseInt(input) - 1;
      if(index >= 0 && index < list.size()){ list.remove(index); }
    }
    else { list.add(input); }
    main();
  }

}