import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile.routes.js";
import queryRouter from "./routes/query.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
app.use(cors({ origin: "*",
credentials: true }));
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));
app.use(express.static("public/temp"));
app.use(cookieParser());
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1", queryRouter);
app.get("/", (req, res) => res.send({ ok: true }));
app.use(errorHandler);
export { app };
