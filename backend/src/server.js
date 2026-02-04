const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.get("/api/auth/signup", (req, res) => {
    res.send("Signup endpoint")
})

app.get("/api/auth/login", (req, res) => {
    res.send("Login endpoint")
})

app.get("/api/auth/logout", (req, res) => {
    res.send("Logout endpoint")
})





app.listen(3000, () => {
    console.log("Server is running on port 3000");
});