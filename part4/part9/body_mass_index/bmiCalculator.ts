import parseArguments from "./parseArguments.ts";


const calculateBmi = (height: number, weight: number): string => {
  const heightSquaredInMeters = (height / 100) ** 2;
  const bmi = weight / heightSquaredInMeters;

  if (bmi <= 18) {
    return "underweight";
  } else if (bmi <= 25) {
    return "normal weight";
  } else if (bmi <= 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

try {
  const [height, weight] = parseArguments(process.argv[2], process.argv[3]);
  const bmi = calculateBmi(height, weight);
  console.log(`You are: ${bmi}`);
} catch (error) {
  let errorMessage = "Something unexpected happened. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
