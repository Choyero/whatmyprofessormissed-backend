const express = require('express');
const app = express();

// use this middleware to have access to req.body in requests
app.use(express.json())

// import routes to use
app.use('/users', require('./routes/users.routes'));
app.use('/posts', require('./routes/posts.routes'));

const port = 3000;

app.listen(port, () => {
  console.log(`JWT Server App listening on port ${port}`)
});