const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

// middleware setup
app.use(express.json({limit: "25mb"}));
// app.use((express.urlencoded({limit: "25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: 'https://bonceback-frontend.vercel.app',
    credentials: true
}))


// all routes
const authRoutes = require('./src/users/user.route');

app.use('/api/auth', authRoutes);



main()
  .then(() => console.log("mongodb is successfully connected."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Bounce Back Server is running....!");
  });
}

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
