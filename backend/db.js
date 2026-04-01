const mongoose = require('mongoose');

require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    // Connect to MongoDB (no deprecated options)
    await mongoose.connect(mongoURI);

    console.log("✅ Connected to MongoDB");

    // Fetch food items
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetch food categories
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Store globally
    global.food_items = foodItemsData;
    global.food_category = foodCategoryData;

    console.log("✅ Data loaded successfully");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
  }
};

module.exports = mongoDB;