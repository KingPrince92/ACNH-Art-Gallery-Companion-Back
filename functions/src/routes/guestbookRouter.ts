import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import ArtCollection from "../models/ArtCollection";

const guestbookRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

guestbookRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string | undefined = req.params.uid;
    const client = await getClient();
    const query: any = { uid };
    const cursor = client
      .db()
      .collection<ArtCollection>("guestbook")
      .find(query);
    const results = await cursor.toArray();
    res.status(200);
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

guestbookRouter.post("/", async (req, res) => {
  try {
    const client = await getClient();
    const newArt: ArtCollection = req.body;
    await client.db().collection<ArtCollection>("guestbook").insertOne(newArt);
    res.status(200);
    res.json(newArt);
  } catch (err) {
    errorResponse(err, res);
  }
});

guestbookRouter.delete("/:id/user/:uid", async (req, res) => {
  try {
    const id: string = req.params.id;
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = await client
      .db()
      .collection<ArtCollection>("guestbook")
      .deleteOne({ _id: new ObjectId(id), uid });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("Not Found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});
export default guestbookRouter;
