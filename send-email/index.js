const express = require("express");
const cors = require("cors");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Routes
const emailRouter = require("./api/routes/sendEmailRoute.js");

// example API call: localhost:8080/api/sendEmail?email=paulluanvothanh@gmail.com
app.use("/api", emailRouter);

const PORT = 8080;
app.listen(PORT, () => console.log("Services running on port 8080"));
