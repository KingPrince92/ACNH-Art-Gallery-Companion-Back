import { ObjectId } from "mongodb";

export default interface ArtCollection {
  _id?: ObjectId;
  image_url: string;
  name: string;
}
