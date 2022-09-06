import { ObjectId } from "mongodb";
import ArtCollection from "./ArtCollection";

export default interface UserProfile {
  _id?: ObjectId;
  uid: string;
  displayName: string;
  photoURL: string;
  collections: ArtCollection[];
  wishlist: ArtCollection[];
}
