import { ObjectId } from "mongodb";

export default interface GuestbookComment {
  _id?: ObjectId;
  from: string;
  text: string;
}
