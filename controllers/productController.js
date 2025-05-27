import Product from "../models/product.js";

export async function createProduct(req, res) {
    if (!req.user) {
        return res.status(403).json({ message: "You need to login first" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to create a product" });
    }

    const allowedCategories = ["Living Rooms", "Religious", "Kitchen", "Resturant"];
    const { category } = req.body;

    // Validate category
    if (!allowedCategories.includes(category)) {
        return res.status(400).json({ message: `Invalid category. Allowed: ${allowedCategories.join(", ")}` });
    }

    const product = new Product(req.body);

    try {
        await product.save();
        res.json({ message: "Product saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Product not saved", error: err.message });
    }
}
export function getProducts(req,res){
    Product.find().then(
        (products)=>{
            res.json(products)
        }
    ).catch(
        (err)=>{
            console.log(err);
            res.status(500).json({
                message : "Products not found"
            })
        }
    )
}

export async function getProductById(req,res){
    const productId = req.params.Id
    const product = await Product.findOne({productId : productId});
    if(product == null){
        res.status(404).json({
            message : "Product not found"
        })
        return;
    }else{
        res.json({
            product : product
        })
    }
}

export function deleteProduct(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to delete a product"
        })
        return;
    }


Product.findOneAndDelete({"productId" : req.params.productId}).then(
    ()=>{
        res.json({
            message : "Product deleted successfully"
        })
    }
).catch(
    (err)=>{
        res.status(500).json({
            message : "Product not deleted"
        })
    }
  )
}

export function updateProduct(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to update a product"
        })
        return;
    }

    Product.findOneAndUpdate({"productId" : req.params.productId} 
        ,req.body).then(
        ()=>{
            res.json({
                message : "Product updated successfully"
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Product not updated"
            })
        }
    )
}

export async function searchProducts(req, res) {
    const search = req.params.id;
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { altNames: { $regex: search, $options: "i" } } // simpler and works for string arrays
            ]
        });
        res.json({ products });
    } catch (err) {
        res.status(500).json({ message: "Products not found" });
    }
}


export async function getTrendingProducts(req, res) {
  try {
    const products = await Product.find({})
      .sort({ sales: -1 })
      .limit(4);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trending products" });
  }
}

//  New: Get products by category
export async function getProductsByCategory(req, res) {
    const category = req.params.category;
    const allowedCategories = ["Living Rooms", "Religious", "Kitchen", "Resturant"];

    if (!allowedCategories.includes(category)) {
        return res.status(400).json({ message: `Invalid category. Must be one of: ${allowedCategories.join(", ")}` });
    }

    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products by category" });
    }
}