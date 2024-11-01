import mongoose, {Schema, Document} from "mongoose";
import { late } from "zod";

interface IUserProfile extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
}

const UserProfileSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    dateOfBirth: {type: Date, required: true}
})

export default mongoose.models.UserProfile || mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);