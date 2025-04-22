import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:Id",getProductById)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)

export default productRouter;