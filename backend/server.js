// const express = require('express') ZASTARELO
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.get("/", (req,res) => {
    res.send("Server is ready.")
});

app.use("/api/products", productRoutes);

console.log(process.env.MONGO_URI);

app.listen(5000,() => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});


