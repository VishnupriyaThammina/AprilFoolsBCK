const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbcon');
const buttonRoutes = require('./router/buttons');
const userRoute = require('./router/user');
dotenv.config({ path: './.env' });           // Backend config
dotenv.config({ path: './.env.user' });      // User-exposed config

const app = express();
const PORT = process.env.PORT || 3030;
const MONGO_URI = process.env.MONGO_URI
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use('/api', buttonRoutes);
app.use('/user',userRoute)

connectDB(MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
