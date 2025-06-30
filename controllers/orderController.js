import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    if (req.user == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const body = req.body;
    const orderData = {
        orderID: "",
        email: req.user.email,
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        billItems: [],
        total: 0
    };

    const lastBills = await Order.find().sort({ date: -1 }).limit(1);
    if (lastBills.length === 0) {
        orderData.orderID = "ORD0001";
    } else {
        const lastOrderId = lastBills[0].orderID;
        const lastOrderNumber = parseInt(lastOrderId.replace("ORD", ""));
        const newOrderNumberStr = (lastOrderNumber + 1).toString().padStart(4, '0');
        orderData.orderID = "ORD" + newOrderNumberStr;
    }

    for (let i = 0; i < body.billItems.length; i++) {
        const product = await Product.findOne({ productId: body.billItems[i].productId });
        if (!product) {
            return res.status(404).json({ message: `Product with Product ID ${body.billItems[i].productId} not found` });
        }

        const item = body.billItems[i];

        orderData.billItems[i] = {
            productId: product.productId,
            productName: product.name,
            image: product.images[0],
            quantity: item.quantity,
            price: product.price,
            size: item.size || item.selectedSize || null,  
        };

        orderData.total += product.price * item.quantity;
    }

    const order = new Order(orderData);

    try {
        await order.save();
        res.json({ message: "Order saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Order not saved" });
    }
}

export function getOrders(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return;
    }

    if(req.user.role == "admin"){
        Order.find().then(
            (orders)=>{
            res.json(orders);
        }
        ).catch(
            (err)=>{
            res.status(500).json({
                message : "Orders not found"
            });
        })
    }else{
        Order.find({
            email : req.user.email
        }).then(
            (orders)=>{
            res.json(orders);
            }
        ).catch(
            (err)=>{
            res.status(500).json({
                message : "Orders not found"
            });
            }
        )
    }
}

//delete order
export async function deleteOrder(req, res) {
    console.log(req.params.orderID);
    try {
        const orderdelete = await Order.findOneAndDelete({ orderID: req.params.orderID });

        if (!orderdelete) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


export async function updateOrder(req,res){
    try{
        if(req.user == null){
            res.status(401).json({
                message : "Unauthorized"
            })
            return;
        }
        if(req.user.role != "admin"){
            res.status(403).json({
                message : "You are not authorized to update this order"
            })
            return;
        }
        const orderID = req.params.orderID;
        const order = await Order.findOneAndUpdate({ orderID : orderID}, req.body);

        res.json({
            message : "Order updated successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Order not updated"
        });
    }
}