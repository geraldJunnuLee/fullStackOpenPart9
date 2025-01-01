import express from 'express';
import { calculateBmi } from './bmiCalculator';
// import { ExercisePostRequest } from './types';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    const bmiMessage = calculateBmi(Number(height), Number(weight));
    const response = {
      weight,
      height,
      bmi: bmiMessage,
    };
    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: 'malformatted parameters' });
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  const isArray = Array.isArray(daily_exercises);
  
  if (!target || !daily_exercises) {
    throw new Error("parameters missing");
  } else if (isNaN(Number(target)) || !isArray) {
    throw new Error("malformatted parameters");
  } else if (isArray && !daily_exercises.every((dailyExercise) => typeof dailyExercise === 'number')) {
    throw new Error("malformatted parameters");
  }

  const targetAmountOfHours = target as number;

  try {
    const exerciseSummary = calculateExercises(daily_exercises, targetAmountOfHours);
    res.send(exerciseSummary);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
