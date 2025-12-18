import dotenv from "dotenv";
import ConnectDB from "./db/db.js";
import {app} from './app.js';

dotenv.config({
  path: "../.env",
});
ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is started at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(`ConnectDB function failed `, error);
  });
