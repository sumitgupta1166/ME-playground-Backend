import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
password: { type: String, required: true },
});


userSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10));
next();
});


userSchema.methods.verifyPassword = function (password) {
return bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);