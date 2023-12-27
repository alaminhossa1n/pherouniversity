import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    lastThreePassword: [{ type: String, select: 0 }],
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(this.password, Number(config.salt_rounds));

  next();
});

userSchema.post("save", function (next) {
  const doc = this;
  doc.password = "";
});

const UserModel = model<TUser>("User", userSchema);

export default UserModel;
