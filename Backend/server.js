const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const HandleError = require("./handleError");

const app = express();
const server = http.createServer(app);

// import router contact 
// get uri from enviroment variable
const MONGO_URI = process.env.ATLAS_URI;
// init port or use enviroment port
const PORT = process.env.PORT || 2000;
// connect to Mongodb atlas

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connect database successfully!");
    } catch (error) {
        console.log(error);
    }
})()

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
}))

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
})

app.use("/api", require("./routes/index"));
// app.use("/contact", contactRoute);

// handle 404 response
app.use(function (req, res, next) {
    res.json(new HandleError("Page not found!", 404));
})
// start server
server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})