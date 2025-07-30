const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB - Updated for Render deployment
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 
            "mongodb+srv://ayve012:7PmEEE5Oqq0Fk84h@cluster0.h9nloic.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // 10 seconds
            socketTimeoutMS: 45000, // 45 seconds
            maxPoolSize: 10,
            bufferCommands: false,
            bufferMaxEntries: 0,
            // SSL options for Render deployment
            ssl: true,
            sslValidate: true,
        });
        
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

// Connect to database
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
});

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine - Updated for production
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
    const baseURL = process.env.NODE_ENV === 'production' 
        ? `https://${req.get('host')}` 
        : `http://localhost:${port}`;
    
    res.json({
        success: 1,
        image_url: `${baseURL}/images/${req.file.filename}`,
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
});

app.post("/addproduct", async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            error: "Failed to add product"
        });
    }
});

// Creating API For Deleting Products
app.post("/removeproduct", async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            error: "Failed to remove product"
        });
    }
});

// Creating API For getting all Products
app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch products"
        });
    }
});

// Schema creating for user Model
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});

// Creating endpoint for registering user
app.post("/signup", async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({
                success: false,
                error: "Existing User Found with same email address",
            });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });
        await user.save();

        const data = {
            user: {
                id: user.id,
            },
        };

        const jwtSecret = process.env.JWT_SECRET || "secret_ecom";
        const token = jwt.sign(data, jwtSecret);
        res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            success: false,
            error: "Failed to register user"
        });
    }
});

// Creating endpoint for user login
app.post("/login", async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const jwtSecret = process.env.JWT_SECRET || "secret_ecom";
                const token = jwt.sign(data, jwtSecret);
                res.json({
                    success: true,
                    token,
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: "Wrong Password",
                });
            }
        } else {
            res.status(400).json({
                success: false,
                error: "Wrong Email ID",
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            error: "Login failed"
        });
    }
});

// creating endpoint for newCollection data
app.get("/newcollectioned", async (req, res) => {
    try {
        let producrs = await Product.find({});
        let newcollection = producrs.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching new collection:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch new collection"
        });
    }
});

// Creating endpoint for popular women section
app.get("/popularinwomen", async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popular_in_women = products.slice(0, 4);
        console.log("Popular in women fetched");
        res.send(popular_in_women);
    } catch (error) {
        console.error("Error fetching popular women products:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch popular women products"
        });
    }
});

// Creating middleware for fetching user
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({
            error: "Please Authenticate using valid token",
        });
    } else {
        try {
            const jwtSecret = process.env.JWT_SECRET || "secret_ecom";
            const data = jwt.verify(token, jwtSecret);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({
                error: "Please authenticate using a valid token",
            });
        }
    }
};

// creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            error: "Failed to add to cart"
        });
    }
});

// Creating endpoint for removing products in cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("Remove", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({
            success: false,
            error: "Failed to remove from cart"
        });
    }
});

// Creating endpoint for getting cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({
            success: false,
            error: "Failed to get cart data"
        });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on Port " + port);
    } else {
        console.log("Error" + error);
    }
});
