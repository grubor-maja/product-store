import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async(req,res) => {
    try {
        const products = await Product.find({});
        if(!products) {
            return res.status(400).json({success:false,message:"Products not found"});
        }
        res.status(201).json({success: true, data: products});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
}

export const getOneProduct = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(400).json({success:false,message:"Product not found"});
        }
        res.status(201).json({success: true, data: product});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
};

export const updateProduct = async(req,res) => {

    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "Invalid Product Id"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        if(!updatedProduct) {
            return res.status(400).json({success:false,message:"Product not updated"});
        }
        res.status(201).json({success: true, data: updatedProduct});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
};

export const createProduct = async(req, res) => {
    const product = req.body; // user will send the data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false,message:"Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product:",error.message);
        res.status(500).json({success: false, message: "Server Error"});

    }
};

export const deleteProduct = async(req,res) => {
    const {id} = req.params;
    // console.log("id: ",id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted."})
    } catch (error) {
        res.status(404).json({success:false,message:"Product not found"});
    }
}