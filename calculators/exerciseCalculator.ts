interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  rating: number;
  ratingDescription: string;
  average: number;
}

export const calculateExercises = (
  exerciseHoursPerDayArray: number[],
  targetHours: number
) => {
  const numOfDays = exerciseHoursPerDayArray.length;
  if (numOfDays > 10) {
    throw new Error('too many training days. Please enter maximum of 10 days');
  } else if (numOfDays <= 3) {
    throw new Error(
      'Not enough training days for data. please enter minimum of 4 days'
    );
  }
  const trainingDaysAmount = exerciseHoursPerDayArray.filter((hours) => hours > 0).length;
  const totalHours = exerciseHoursPerDayArray.reduce((sum: number, hours: number) => sum + hours, 0);
  const averageTrainingTime = totalHours / numOfDays;
  const isTargetHoursReached = averageTrainingTime >= targetHours;
  const success = numOfDays === trainingDaysAmount;

  let rating;
  let ratingDescription;

  if (isTargetHoursReached) {
    rating = 3;
    ratingDescription = 'Good';
  } else if (averageTrainingTime >= 0.6 * targetHours) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Needs improvement';
  }

  const result: Result = {
    periodLength: numOfDays,
    trainingDays: trainingDaysAmount,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average: averageTrainingTime,
  };
  return result;
};

const targetHours = Number(process.argv[2]);
const args = process.argv.slice(3);
const exerciseHours = args.map((arg) => Number(arg));

try {
  if (require.main === module) {
    console.log(calculateExercises(exerciseHours, targetHours));
  }
} catch (error) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
