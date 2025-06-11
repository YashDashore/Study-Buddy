import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import router from './routes/User.routes.js'
import { Todorouter } from "./routes/Todo.routes.js";
import { AssignRoute } from "./routes/Assignment.routes.js";
import { SessionRoute } from "./routes/StudyProg.routes.js";
import { GroupRouter } from "./routes/GroupTask.routes.js";

const app = express();
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(express.json()); //Accepting the json file.
app.use(
  express.urlencoded({
    limit: "20kb",
  })
); // Accept data from url and urlencoded helps to decode the data.

app.use(express.static("public")); // used to store pdfs, public assets
app.use(cookieParser())

console.log("INSIDE APP ")
app.use("/api/v1/users", router)
app.use("/api/v1/tasks", Todorouter)
app.use("/api/v1/assignments", AssignRoute)
app.use("/api/v1/studyProgress", SessionRoute)
app.use("/api/v1/groupTask", GroupRouter)

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

export { app };
