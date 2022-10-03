  using System;

  class Program {

    public double CalculateBMI(double lengthInCm, double weightInKg) {
      return Math.Round(
        10 * weightInKg /
        Math.Pow(lengthInCm / 100, 2)
      ) / 10.0;
    }

    public String AssessBMI(double bmi) {
      return "Du är " + (
        bmi > 30.0 ? "fet" :
        bmi > 25.0 ? "överviktig" :
        bmi >= 18.5 ? "normalviktig" : "underviktig"
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
      Console.WriteLine("BMI-kalkylatorn C#");
      Console.WriteLine("---------------------");
      double cm = InputPosNumber("Ange din längd i cm:");
      double kg = InputPosNumber("Ange din vikt i kg:");
      return new double[] { cm, kg };
    }

    public Program() {
      double[] input = GetInput();
      double bmi = CalculateBMI(input[0], input[1]);
      Console.WriteLine("Din BMI är " + bmi);
      Console.WriteLine(AssessBMI(bmi));
      Console.WriteLine("\nIgen? (j/n)");
      string answer = Console.ReadLine();
      if (answer != null && answer.ToLower()[0].Equals('j')) {
        new Program();
      }
    }

    static void Main(string[] args) { new Program(); }

  }