import { test} from "@playwright/test";

test("BMI Calculator", async () => {
  const testWeight: number = 50;
  const testHeight: number = 1.5;

  const bmiClassifications: string[] = [
    "Need to gain more weight",
    "Normal",
    "Overweight",
    "Obese",
  ];

  const calculateBMI = (weight: number, height: number): number => {
    if (height <= 0) {
      throw new Error("Height must be greater than 0");
    }
    return weight / (height * height);
  };
  const bmi = calculateBMI(testWeight, testHeight);

  const checkBMIRange = (bmiResult: number): string => {
    let classification: string;

    if (bmiResult < 18.5) {
      classification = bmiClassifications[0];

    } else if ( bmiResult < 25) {
      classification = bmiClassifications[1];
    
    } else if (bmiResult < 30) {
      classification = bmiClassifications[2];
    
    } else {
      classification = bmiClassifications[3];
    }
    return `Your BMI is ${bmiResult.toFixed(2)}. BMI Classification: ${classification}`;
  };

  console.log(checkBMIRange(bmi));
});
