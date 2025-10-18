import parseArguments from "./parseArguments";

export const calculateBmi = (height: number, weight: number): string => {
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

if (require.main === module) {
  try {
    const [height, weight] = parseArguments(process.argv[2], process.argv[3]);
    console.log(`You are: ${calculateBmi(height, weight)}`);
  } catch (error) {
    let errorMessage = "Something unexpected happened. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
