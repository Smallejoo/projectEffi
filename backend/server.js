// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const itemRoute = require('./routes/fetchItems');
const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://gia:1234@cluster0.olqm971.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.use('/reg/auth', authRoute);
app.use('/getitems', itemRoute);

app.use((req, res, next) => {
  console.log(`A new request has arrived: ${req.method} ${req.url}`);
  next(); // Pass control to the next handler
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('new request has arrived');
});
