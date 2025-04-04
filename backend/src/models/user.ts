import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { boolean } from "zod";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: string
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, default: "user" },
}, { timestamps: true });

// Hashing password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//this is a Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model<User>("User", UserSchema);
