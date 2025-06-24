import express from "express";
import { createProduct, deleteProduct, getArrivals, getProductById, getProducts, getProductsByCategory, getRecommendedProducts, getTrendingProducts, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/trending-products",getTrendingProducts)
productRouter.get("/new-arrivals",getArrivals)
productRouter.get("/recommended-products",getRecommendedProducts)
productRouter.get("/search/:id",searchProducts)
productRouter.get("/category/:category",getProductsByCategory)


productRouter.get("/",getProducts)
productRouter.get("/:Id",getProductById)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)

export default productRouter;