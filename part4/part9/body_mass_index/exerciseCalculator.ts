interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (exercises: number[], target: number): Result => {
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

const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

console.log(calculateExercises(exerciseHours, target));
