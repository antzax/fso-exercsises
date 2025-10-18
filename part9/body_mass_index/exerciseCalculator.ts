import parseArguments from "./parseArguments";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (target: number, exercises: number[]): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((hours) => hours > 0).length;

  const totalHours = exercises.reduce((total, hours) => total + hours, 0);
  const average = totalHours / periodLength;

  const success = average >= target ? true : false;

  const ratings = [1, 2, 3];
  const ratingDescriptions = ["bad", "neutral", "good"];
  let rating;
  let ratingDescription;

  if (success) {
    rating = ratings[2];
    ratingDescription = ratingDescriptions[2];
  } else if (average / target > 0.5) {
    rating = ratings[1];
    ratingDescription = ratingDescriptions[1];
  } else {
    rating = ratings[0];
    ratingDescription = ratingDescriptions[0];
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  if(require.main === module) {
    const [target, ...days] = parseArguments(...process.argv.slice(2));
  }

  calculateExercises(target, days)
} catch (error) {
  let errorMessage = "Something unexpected happened. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}


export default calculateExercises