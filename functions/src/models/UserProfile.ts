import { ObjectId } from "mongodb";
import ArtCollection from "./ArtCollection";
import QuizCollection from "./QuizCollection";

export default interface UserProfile {
  _id?: ObjectId;
  uid: string;
  displayName: string;
  photoURL: string;
  collections: ArtCollection[];
  quizScore: QuizCollection[];
}
