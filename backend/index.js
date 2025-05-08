require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/auth'); 
const editRouter = require('./routes/edit')

app.use(express.json());

app.use(cors({
  origin: "https://jayanta-paul-portfolio-awom.vercel.app/",  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));


const connect = require("./connection/connetion");
connect();

app.get('/', (req, res) => {
  res.send("Hello, World!");
});


app.use('/user', userRouter);
app.use('/edit',editRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
