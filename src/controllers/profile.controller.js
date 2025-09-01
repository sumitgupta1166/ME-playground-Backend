import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Profile } from "../models/profile.model.js";


// Create or replace single profile (we assume one profile per user, simplified)
const createOrUpdateProfile = asyncHandler(async (req, res) => {
const payload = req.body;
if (!payload.name || !payload.email) throw new ApiError(400, "name and email are required");
// upsert by email
const profile = await Profile.findOneAndUpdate({ email: payload.email }, { $set: payload }, { new: true, upsert: true, setDefaultsOnInsert: true });
return res.status(200).json(new ApiResponse(200, profile, "Profile created/updated"));
});


const getProfile = asyncHandler(async (req, res) => {
const email = req.query.email;
if (!email) throw new ApiError(400, "email query param is required");
const profile = await Profile.findOne({ email });
if (!profile) throw new ApiError(404, "Profile not found");
return res.status(200).json(new ApiResponse(200, profile, "Profile fetched"));
});


const listProfiles = asyncHandler(async (req, res) => {
// pagination
const page = Math.max(1, parseInt(req.query.page || "1", 10));
const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
const skip = (page - 1) * limit;
const profiles = await Profile.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });
return res.status(200).json(new ApiResponse(200, { data: profiles, page, limit }, "Profiles"));
});


export { createOrUpdateProfile, getProfile, listProfiles };