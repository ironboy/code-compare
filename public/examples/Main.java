import java.util.Scanner;

public class Main {

  Scanner in = new Scanner(System.in);

  public double calculateBMI(double lengthInCm, double weightInKg){
    return Math.round(10 * weightInKg /
      Math.pow(lengthInCm / 100, 2)) / 10.0;
  }

  public String assessBMI(double bmi){
    return "Du är " + (
      bmi > 30.0 ? "fet" :
      bmi > 25.0 ? "överviktig" :
      bmi >= 18.5 ? "normalviktig" : "underviktig"
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
    System.out.println("BMI-kalkylatorn Java");
    System.out.println("---------------------");
    double cm = inputPosNumber("Ange din längd i cm:");
    double kg = inputPosNumber("Ange din vikt i kg:");
    return new double[]{cm, kg};
  }

  public Main() {
    double[] input = getInput();
    double bmi = calculateBMI(input[0], input[1]);
    System.out.println("Din BMI är " + bmi);
    System.out.println(assessBMI(bmi));
    System.out.println("\nIgen? (j/n)");
    String answer = in.nextLine();
    if(answer.matches("(?i)^j.*")){
      new Main();
    }
  }

  public static void main(String[] args){ new Main(); }

}