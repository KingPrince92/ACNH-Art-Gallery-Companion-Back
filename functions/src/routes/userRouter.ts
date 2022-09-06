import express from "express";
import { getClient } from "../db";
import ArtCollection from "../models/ArtCollection";
import UserProfile from "../models/UserProfile";

const userRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

//Get all Users
userRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<UserProfile>("guestbook").find();
    const results = await cursor.toArray();
    res.status(200);
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

//get single User
userRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string | undefined = req.params.uid;
    const client = await getClient();

    const cursor = client
      .db()
      .collection<UserProfile>("guestbook")
      .find({ uid });
    const results = await cursor.toArray();
    res.status(200);
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

//Add user to db
userRouter.post("/", async (req, res) => {
  try {
    const client = await getClient();
    const newUser: UserProfile = req.body;
    await client.db().collection<UserProfile>("guestbook").insertOne(newUser);
    res.status(200);
    res.json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

//Update Collections on user to add to collections
userRouter.put("/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const newArt: ArtCollection = req.body;
    await client
      .db()
      .collection<UserProfile>("guestbook")
      .updateOne({ uid }, { $push: { collections: newArt } });
    res.status(200);
    res.json(newArt);
  } catch (err) {
    errorResponse(err, res);
  }
});

//Update Collections on user to remove from collections
userRouter.put("/remove/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const targetArt: string = req.body.name;
    await client
      .db()
      .collection<UserProfile>("guestbook")
      .updateOne({ uid }, { $pull: { collections: { name: targetArt } } });
    res.status(200);
    res.json(targetArt);
  } catch (err) {
    errorResponse(err, res);
  }
});
// for wishlist
userRouter.put("/wishlist/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const newArt: ArtCollection = req.body;
    await client
      .db()
      .collection<UserProfile>("guestbook")
      .updateOne({ uid }, { $push: { wishlist: newArt } });
    res.status(200);
    res.json(newArt);
  } catch (err) {
    errorResponse(err, res);
  }
});

userRouter.put("/wishlist/remove/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const targetArt: string = req.body.name;
    await client
      .db()
      .collection<UserProfile>("guestbook")
      .updateOne({ uid }, { $pull: { wishlist: { name: targetArt } } });
    res.status(200);
    res.json(targetArt);
  } catch (err) {
    errorResponse(err, res);
  }
});
export default userRouter;
