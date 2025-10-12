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

console.log(calculateBmi(180, 74));
