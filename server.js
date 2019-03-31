const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mealsRoutes = require('./routes/api/meals');
const path = require('path');

app.use(express.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db, {useNewUrlParser:true})
  .then(() => console.log("connected to mongo"))
  .catch(err => console.log('err: ', err));

//routes
app.use('/api/meals', mealsRoutes);

//serve static asset if in production env
if (process.env.NODE_ENV === "production") {
  
  app.use(express.static('client/build'));

  app.get('*', function(req,res) {
    res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
  });

}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));