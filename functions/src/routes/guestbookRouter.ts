import express from "express";
import { getClient } from "../db";
import GuestbookComment from "../models/GuestbookComment";

const guestbookRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

guestbookRouter.get("/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<GuestbookComment>("guestbook")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default guestbookRouter;
