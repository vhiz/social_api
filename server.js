import express from "express";
import treblle from "@treblle/express";
import "dotenv/config";
import { connect } from "mongoose";
import { limiter } from "./utils/limiter.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
    additionalFieldsToMask: [],
  })
);
app.use(limiter(10000, 5, "You can not make any request at this time"));
app.use(cookieParser());

const db = async (err) => {
  await connect(process.env.MONGO_URI);
  if (err) return res.status(400).json(err);
  console.log(`database connection complete`);
};

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Vhiz Social");
});

const Port = process.env.PORT || 3000;

app.listen(Port, (err) => {
  db();
  if (err) throw err;
  console.log(`Port: ${Port}`);
});
