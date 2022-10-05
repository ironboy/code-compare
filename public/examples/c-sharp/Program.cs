using System;

public class Program {

  public double CalculateBMI(double lengthInCm, double weightInKg) {
    return Math.Round(
      10 * weightInKg /
      Math.Pow(lengthInCm / 100, 2)
    ) / 10.0;
  }

  public String AssessBMI(double bmi) {
    return "You are " + (
      bmi > 30.0 ? "big and beautiful" :
      bmi > 25.0 ? "solidly build" :
      bmi >= 18.5 ? "of medium weight" : "easily carried"
    ) + ".";
  }

  public double InputPosNumber(String question) {
    Console.WriteLine(question);
    string a = Console.ReadLine();
    double.TryParse(a,
      out double answer);
    return answer > 0 ? answer : InputPosNumber(question);
  }

  public double[] GetInput() {
    Console.Clear();
    Console.WriteLine("BMI Calculator C#");
    Console.WriteLine("---------------------");
    double cm = InputPosNumber("Your length in centimeters:");
    double kg = InputPosNumber("Your weight in kilograms:");
    return new double[] { cm, kg };
  }

  public Program() {
    double[] input = GetInput();
    double bmi = CalculateBMI(input[0], input[1]);
    Console.WriteLine("\nYour BMI is " + bmi);
    Console.WriteLine(AssessBMI(bmi));
    Console.WriteLine("\nAgain? (y/n)");
    string answer = Console.ReadLine();
    if (answer != null && answer.ToLower()[0].Equals('y')) {
      new Program();
    }
  }

  static void Main(string[] args) { new Program(); }

}