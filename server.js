// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.originalUrl);
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api/profile', require('./routes/profile'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error('❌ Mongo Error:', err));

