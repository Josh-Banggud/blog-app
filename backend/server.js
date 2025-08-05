const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const reactionRoutes = require('./routes/reactions');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/post', reactionRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));
