const mongoose = require('mongoose');

const options = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
};

module.exports = async () => {
     try {
          await mongoose.connect("mongodb+srv://Bolaji:12345678@Test@cluster0.ywv3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", options)
          console.log(':::> Connected to MongoDB database')
     } catch (error) {
          console.log("<::: Couldn't connect to database ", error)
     }
};
