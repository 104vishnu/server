import express from 'express';
import { addBooking, getBookingById, getAllBookings, cancelBooking } from '../controllers/booking.controller.js';
import {Authenticate} from '../middlewares/authenticate.middleware.js';
const router = express.Router();

// Route to add a new booking

router.route("/").get(Authenticate,getAllBookings);
router.route("/add/:flightid").post(Authenticate,addBooking);

router.route('/:id').get(Authenticate, getBookingById).delete(Authenticate, cancelBooking);


export default router;
