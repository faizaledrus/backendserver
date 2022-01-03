
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import record from "./routes/record.js"
import db from "./db/conn.js"

const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
// app.use(express.json());
app.use(record);
// get driver connection
const dbo = db
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});