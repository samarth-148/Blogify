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
console.log(process.env.MONGO_URL);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

handleConnection(process.env.MONGO_URL)
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
    origin: "https://blogifybysam.netlify.app",
    credentials: true,
  }),
  dataRouter
);

app.use(
  "/api/user",
  cors({
    origin: "https://blogifybysam.netlify.app",
    credentials: true,
  }),
  userRouter
);
