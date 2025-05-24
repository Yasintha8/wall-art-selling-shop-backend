import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/",getProducts)
productRouter.get("/search/:id",searchProducts)
productRouter.get("/:Id",getProductById)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)

export default productRouter;