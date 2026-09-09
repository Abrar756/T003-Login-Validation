const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});


// Login route
app.post("/api/login", (req, res) => {

    const { email, password } = req.body;


    // Check email
    if (!email) {
        return res.status(400).json({
            message: "Please enter your email."
        });
    }


    // Check password
    if (!password) {
        return res.status(400).json({
            message: "Please enter your password."
        });
    }


    // Temporary test account
    const correctEmail = "test@gmail.com";
    const correctPassword = "123456";


    // Check login details
    if (
        email !== correctEmail ||
        password !== correctPassword
    ) {
        return res.status(401).json({
            message: "Invalid email or password."
        });
    }


    // Successful login
    res.status(200).json({
        message: "Login successful!"
    });
});


// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});