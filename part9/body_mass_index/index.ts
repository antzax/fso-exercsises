import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("hello fs!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (!height || !weight)
    return res.status(404).json({ error: "parameters missing" });

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    return res.status(404).json({ error: "malformatted parameters" });

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
