const express = require('express');
const mongoose = require('mongoose');
const locationRoutes = require('./routes/locations'); 
const characterRoutes = require('./routes/characters');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://teegunnerz:HowRG47AcBDGRv0N@utestclust.ghglwvu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// mongoose.connect('mongodb+srv://teegunnerz:YHeyZMq3IXUZAAcd@a4assignmtcluster0.ky4lw7p.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });  

// 6DmjRH8P6BpIkJY3

// mongoose.connect('mongodb+srv://teegunnerz:6DmjRH8P6BpIkJY3@a4assignmt1cluster0.ylnoazz.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB:', err));

app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1', characterRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
