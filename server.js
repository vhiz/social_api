import express from "express";
import treblle from "@treblle/express";
import "dotenv/config";
import { connect } from "mongoose";
import { limiter } from "./utils/limiter.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

import authroute from "./route/auth.js";
import usersroute from "./route/users.js";

//middlewares
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
    additionalFieldsToMask: [],
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter(10000, 5, "You can not make any request at this time"));
app.use(cookieParser());

//routes
app.use("/api/auth", authroute);
app.use("/api/user", usersroute);

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
