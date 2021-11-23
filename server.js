require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const pollRoutes = require("./app/routes/polls");
const authRoutes = require("./app/routes/auth");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT } = process.env;

app.use(express.json());

app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/api/polls", pollRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello World"));

async function connect() {
  try {
    // await mongoose.connect(
    //   "mongodb+srv://Chibuike:<password>@polltracker.x95ap.mongodb.net/polls?retryWrites=true&w=majority".replace(
    //     "<password>",
    //     process.env.PASSWORD
    //   ),
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
    // );
    app.listen(PORT || 5000, "0.0.0.0", () =>
      console.log(`Server is running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Connection to database failed", err);
  }
}

connect();
