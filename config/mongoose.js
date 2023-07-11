const mongoose = require('mongoose');

//connect to the database
mongoose.connect(process.env.MONGODB_URI)

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) {
     console.log("Not able to connect.",err.message); 
});

//success
db.once('open', function() {
    console.log("Successfully connected to the database");

});

module.exports = mongoose