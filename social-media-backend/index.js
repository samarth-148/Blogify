/** @format */
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { handleConnection } = require("./connection");
const dataRouter = require("./routes/data.routes");
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { preprocess } = require("zod");

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

handleConnection("mongodb://127.0.0.1:27017/socialmedia")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("App is listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.use(
  "/api/data",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  dataRouter
);

app.use(
  "/api/user",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  userRouter
);

app.use("/uploads", express.static("uploads"));
