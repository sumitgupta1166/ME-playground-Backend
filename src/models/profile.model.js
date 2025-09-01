import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
  },
});

const workSchema = new mongoose.Schema({
  title: String,
  company: String,
  from: String,
  to: String,
  description: String,
});

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    education: String,
    skills: [{ type: String, trim: true }],
    projects: [projectSchema],
    work: [workSchema],
    links: {
      github: String,
      linkedin: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

// Text index for search
profileSchema.index({
  name: "text",
  "projects.title": "text",
  "projects.description": "text",
  education: "text",
});

export const Profile = mongoose.model("Profile", profileSchema);
