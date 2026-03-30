const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://nilay2003:gotham123@clusterfoode.yptzswe.mongodb.net/foodeproject?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const foodItems = mongoose.connection.db.collection('food_items');
    const itemData = await foodItems.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection('food_category');
    const catData = await foodCategory.find({}).toArray();

    global.food_items = itemData;
    global.food_category = catData;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = mongoDB;
