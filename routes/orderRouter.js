import express from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.get("/",getOrders);
orderRouter.put("/:orderID", updateOrder)
orderRouter.delete("/:orderID",deleteOrder);

export default orderRouter;