require("dotenv").config();
const express = require("express");
const connectDB = require("./dbconnection/connetion");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


const userRouter = require("./routes/auth");
const editRouter = require("./routes/edit");
const resumeRoute = require("./routes/resumeRoute");
const imageRoute = require("./routes/imageRoute")

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://jayanta-paul-portfolio.pixbit.me",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


connectDB();


app.use("/api/user", userRouter);
app.use("/api/edit", editRouter);
app.use("/api/resume",resumeRoute);
app.use("/api/image",imageRoute )

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
