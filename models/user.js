import { models, Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "tutor"],
        default: "user",
      },

}, {timestamps: true});

const User = models.User || mongoose.model("User", userSchema);

export default User;