import java.util.Scanner;

public class Main {

  Scanner in = new Scanner(System.in);

  public double calculateBMI(double lengthInCm, double weightInKg){
    return Math.round(10 * weightInKg /
      Math.pow(lengthInCm / 100, 2)) / 10.0;
  }

  public String assessBMI(double bmi){
    return "You are " + (
      bmi > 30.0 ? "big and beautiful" :
      bmi > 25.0 ? "solidly built" :
      bmi >= 18.5 ? "of medium weight" : "easily carried"
    ) + ".";
  }

  public double inputPosNumber(String question){
    System.out.println(question);
    String a = in.nextLine();
    double answer = a.matches("\\d+\\.*\\d*")
      ? Double.parseDouble(a) : 0;
    return answer > 0 ? answer : inputPosNumber(question);
  }

  public double[] getInput(){
    System.out.println("\n".repeat(60));
    System.out.println("BMI Calculator Java");
    System.out.println("---------------------");
    double cm = inputPosNumber("Your length in centimeters:");
    double kg = inputPosNumber("Your weight in kilograms:");
    return new double[]{cm, kg};
  }

  public Main() {
    double[] input = getInput();
    double bmi = calculateBMI(input[0], input[1]);
    System.out.println("\nYour BMI is " + bmi);
    System.out.println(assessBMI(bmi));
    System.out.println("\nAgain? (y/n)");
    String answer = in.nextLine();
    if(answer.matches("(?i)^y.*")){
      new Main();
    }
  }

  public static void main(String[] args){ new Main(); }

}