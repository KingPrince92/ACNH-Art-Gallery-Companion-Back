import express from "express";
import { getClient } from "../db";
import QuizCollection from "../models/QuizCollection";

const quizRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

quizRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<QuizCollection>("quizscores")
      .find()
      .sort({ score: -1 })
      .toArray();
    res.status(200);
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

quizRouter.post("/", async (req, res) => {
  try {
    const client = await getClient();
    const newScore: QuizCollection = req.body;
    await client
      .db()
      .collection<QuizCollection>("quizscores")
      .insertOne(newScore);
    res.status(200);
    res.json(newScore);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default quizRouter;
