import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(
  express.json({
    limit: "20kb",
  })
); //Accepting the json file.
app.use(
  express.urlencoded({
    limit: "20kb",
  })
); // Accept data from url and urlencoded helps to decode the data.

app.use(express.static("public")); // used to store pdfs, public assets
app.use(cookieParser())

import UserRouter from './routes/User.routes.js'
app.use("/api/v1/users", UserRouter)

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

export { app };
