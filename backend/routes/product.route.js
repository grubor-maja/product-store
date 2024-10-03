import express from 'express';
import { getProducts,getOneProduct, updateProduct, createProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/",getProducts);
router.get("/:id",getOneProduct);
router.put("/:id",updateProduct);
router.post("/",createProduct );
router.delete("/:id",deleteProduct );

export default router;