import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, getProductsByCategory, getTrendingProducts, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/trending-products",getTrendingProducts)
productRouter.get("/",getProducts)
productRouter.get("/search/:id",searchProducts)
productRouter.get("/:Id",getProductById)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/category/:category",getProductsByCategory)


export default productRouter;