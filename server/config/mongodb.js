const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shivamlnikam:G5gaoy8CJAiNYsH8@cluster0.1a0cljf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
