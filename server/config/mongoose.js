const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost/task_board", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"

});

const db = mongoose.connection;
db.on('error',  console.error.bind(console, 'error connecting to db'));
db.once('open', () => {
    console.log('Successfully connected to the database');

})