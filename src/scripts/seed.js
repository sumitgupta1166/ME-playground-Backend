import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "../src/db/index.js";
import { Profile } from "../src/models/profile.model.js";
const run = async () => {
try {
await connectDB();
// replace or create sample profile — set your real data here
const sample = {
name: "Your Name",
email: "you@example.com",
education: "B.Tech in Computer Science",
skills: ["javascript", "nodejs", "react", "mongodb"],

projects: [
{ title: "Portfolio Website", description: "Personal portfolio", links:
{ github: "https://github.com/you" } },
],
work: [],
links: { github: "https://github.com/you", linkedin: "https://linkedin.com/in/you" },
};
await Profile.findOneAndUpdate({ email: sample.email }, { $set: sample }, {
upsert: true });
console.log("Seeded profile");
process.exit(0);
} catch (err) {
console.error(err);
process.exit(1);
}
};
run();