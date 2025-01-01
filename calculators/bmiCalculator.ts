export function calculateBmi(height: number, weight: number): string {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Both height(cm) and weight(kg) must be a number');
  }
  const heightInMeters = height / 100;

  const bmi = weight / (heightInMeters * heightInMeters);

  const bmiResult = getBMIMessage(Math.round(bmi * 100) / 100);

  return bmiResult;
}

function getBMIMessage(bmi: number): string {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

try {
  if (require.main === module) {
    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
