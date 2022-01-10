const mongoose = require('mongoose');

const options = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
};

module.exports = async () => {
     try {
          await mongoose.connect("mongodb://localhost:27017/fixbot", options)
          console.log(':::> Connected to MongoDB database')
     } catch (error) {
          console.log("<::: Couldn't connect to database ", error)
     }
};