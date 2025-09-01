import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Profile } from "../models/profile.model.js";
import mongoose from "mongoose";

// /search?q=... (search name, projects.title, education)
const search = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  if (q.trim() === "")
    return res.status(200).json(new ApiResponse(200, [], "No query"));
  const results = await Profile.find({ $text: { $search: q } }).limit(200);
  return res.status(200).json(new ApiResponse(200, results, "Search results"));
});

// /projects?skill=python
const projectsBySkill = asyncHandler(async (req, res) => {
  const skill = req.query.skill;
  if (!skill) throw new ApiError(400, "skill query param is required");
  // find projects where projects array contains skill (case-insensitive match in skills)
  const profiles = await Profile.find({
    skills: { $in: [new RegExp(`^${skill}$`, "i")] },
  }).select("projects name skills");
  // collect projects
  const projects = [];
  profiles.forEach((p) => {
    p.projects.forEach((proj) =>
      projects.push({ owner: p.name, skills: p.skills, project: proj })
    );
  });
  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects by skill"));
});

// /skills/top - return top N skills across profiles
const topSkills = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit || "10", 10);
  // aggregate
  const pipeline = [
    { $unwind: "$skills" },
    { $group: { _id: { $toLower: "$skills" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
    { $project: { skill: "$_id", count: 1, _id: 0 } },
  ];
  const resAgg = await Profile.aggregate(pipeline);
  return res.status(200).json(new ApiResponse(200, resAgg, "Top skills"));
});

// /health
const health = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { status: "ok" }, "Service healthy"));
});

export { search, projectsBySkill, topSkills, health };
