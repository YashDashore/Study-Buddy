import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import router from "./routes/User.routes.js";
import { Todorouter } from "./routes/Todo.routes.js";
import { AssignRoute } from "./routes/Assignment.routes.js";
import { SessionRoute } from "./routes/StudyProg.routes.js";
import { GroupRouter } from "./routes/GroupTask.routes.js";

const __dirname = path.resolve();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://study-buddy-3tys.onrender.com"
];

// ------------------ BODY + COOKIES ------------------
app.use(express.json());
app.use(express.urlencoded({ limit: "20kb", extended: true }));
app.use(cookieParser());

// ------------------ CORS (API ONLY) ------------------
app.use(
  "/api",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ------------------ API ROUTES ------------------
app.use("/api/v1/users", router);
app.use("/api/v1/tasks", Todorouter);
app.use("/api/v1/assignments", AssignRoute);
app.use("/api/v1/studyProgress", SessionRoute);
app.use("/api/v1/groupTask", GroupRouter);

// ------------------ STATIC FRONTEND ------------------
app.use(express.static(path.join(__dirname, "Frontend", "dist")));

// ------------------ SPA FALLBACK (LAST) ------------------
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Frontend", "dist", "index.html")
  );
});

export { app };
