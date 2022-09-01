import { ObjectId } from "mongodb";

export default interface QuizCollection {
  _id?: ObjectId;
  photo: string;
  name: string;
  score: number;
}
