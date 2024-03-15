import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//routing
import authRoute from "./routes/auth.route.js"
import airlineRoute from "./routes/airline.route.js";
import bookingRoute from  "./routes/booking.route.js"
import Admin from './routes/Admin.route.js';


import flightRoute from "./routes/flight.route.js";


import connectDB from "./config/config.js"

// dotenv.config();
dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));


app.use('/api/v1/admin',Admin);

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/add',airlineRoute);
app.use('/api/v1/flight',flightRoute)
app.use('/api/v1/booking',bookingRoute)















app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});



