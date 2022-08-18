const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('Your Connnection String Goes Here!',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Error handling
var db = mongoose.connection;
db.on('error', error => console.error(error.message));
// Callback function
db.once('open', function() {
  // We're connected!
  console.log("MongoDB connected!")
});



// use this middleware to have access to req.body in requests
app.use(express.json())

// import routes to use
app.use('/users', require('./routes/users.routes'));

const port = 3000;

app.listen(port, () => {
  console.log(`Pagination Server App listening on port ${port}`)
});