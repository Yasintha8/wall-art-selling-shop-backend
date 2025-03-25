import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altName : {
        type : [String],
        default : [] 
    },
    price : {
        type : Number,
        required : true
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : [String],
        required : true,
        default : ["https://brissbella.com/wp-content/uploads/2022/12/pexels-valeriia-miller-3685530.jpg"]
    },
    stock : {
        type : Number,
        required : true
    },
})

const Product = mongoose.model("products", productSchema)
export default Product;