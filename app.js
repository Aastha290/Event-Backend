const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./Routes/eventRoutes')
const bookingRoutes = require('./Routes/bookingRoutes')
const emailRoutes = require('./Routes/emailRoutes');
const contactRoute = require('./Routes/contact');
const razorpayRoutes = require('./Routes/razorpayRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const {login ,signUp} = require('./Controller/userController'); 

app.post('/signup', (req, res, next) => {
    console.log('POST /signup');
    next();
}, signUp);

app.post('/login', (req, res, next) => {
    console.log('POST /login');
    next();
}, login);

app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);
app.use('/api', emailRoutes);
app.use('/contact', contactRoute);
app.use('/razorpay', razorpayRoutes); 


mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('db connected'))
    .catch(err => {
        console.log(err) 
    });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
