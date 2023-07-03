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
import postroute from "./route/posts.js";

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
app.use("/api/users", usersroute);
app.use("/api/post", postroute);

const db = async () => {
  try {
    // Attempt to connect to the first URL
    await connect(process.env.MONGO_URI);
    console.log('Database connection successful locally');
  } catch (firstUrlError) {
    try {
      // If the first URL connection fails, attempt to connect to the second URL
      await connect(process.env.MONGO_URL);
      console.log('Database connection successful on air');
    } catch (secondUrlError) {
      console.error('Failed to connect to both URLs:', secondUrlError);
    }
  }
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
