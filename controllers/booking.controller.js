import Booking from '../models/booking.model.js';
import Airline from '../models/airline.model.js';
import User from '../models/user.model.js';




// const addBooking = async (req, res) => {
//     try {
//         const flightId = req.params.flightid.trim(); // Trim whitespace and newline characters
//         const userId = req.user._id;

//         const flight = await Airline.findById(flightId);
//         if (!flight) {
//             return res.status(404).json({ message: "Flight not found" });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const seat = flight.seat;
//         if (seat <= 0) {
//             return res.status(400).json({ message: "No available seats on this flight" });
//         }

//         flight.seat--;
//         const updatedFlight = await flight.save();

//         const newBooking = new Booking({ 
//             flight: updatedFlight._id,
//             user: user._id   
//         });
//         await newBooking.save();

//         res.status(201).json({ message: "Booking created successfully" });
//     } catch (error) {
//         console.error("Error creating booking:", error);
//         res.status(500).json({ message: "Booking failed" });
//     }
// };



// Function to generate a unique booking ID

const generateBookingId = () => {
    // Generate a random string as the booking ID
    const randomString = Math.random().toString(36).substr(2, 10);
    return `BOOK-${randomString}`;
};

// Function to add a booking
const addBooking = async (req, res) => {
    try {
        // Extract flight ID and user ID from request
        const flightId = req.params.flightid.trim();
        const userId = req.user._id;

        // Find the flight and user based on their IDs
        const flight = await Airline.findById(flightId);
        const user = await User.findById(userId);

        // Check if flight and user exist
        if (!flight || !user) {
            return res.status(404).json({ message: "Flight or user not found" });
        }

        // Extract the number of tickets to be booked from the request body
        const numTickets = req.body.numTickets || 1; // Default to 1 ticket if not provided

        // Check if there are enough available seats on the flight
        if (flight.seat < numTickets) {
            return res.status(400).json({ message: "Not enough available seats on this flight" });
        }

        // Reduce the number of available seats on the flight
        flight.seat -= numTickets;
        const updatedFlight = await flight.save();

        // Create and save a booking for each ticket
        const bookings = [];
        for (let i = 0; i < numTickets; i++) {
            // Generate a unique booking ID for each ticket
            const bookingId = generateBookingId();

            // Create a new booking and add it to the array
            const newBooking = new Booking({ 
                flight: updatedFlight._id,
                user: user._id,
                bookingId: bookingId   
            });
            bookings.push(newBooking);
        }
        await Booking.insertMany(bookings);

        // Return success response
        res.status(201).json({ message: `${numTickets} booking(s) created successfully` });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Booking failed" });
    }
};





const getBookingById = async(req,res)=>{
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json({
            booking
        });
    } catch (error) {
        res.status(400).json({
            message: "No booking Found!!!!!!!!!!!!",
        })
    }    
}

const getAllBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find({user: req.user._id});
        res.status(200).json({
            bookings,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: "Something Wrong Happend",
        });
    }    
}
// const cancelBooking = async(req,res)=>{
//     try {

//         const booking = await Booking.deleteOne(req.params.id);
//         res.status(200).json({
//             message:"Booing Canceled...",
//             booking
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: "No booking Found!!!!!!!!!!!!",
//         })
//     }
// }

// const cancelBooking = async (req, res) => {
//     try {
//         const bookingId = req.params.id;

//         // Find the booking to be canceled
//         const booking = await Booking.findById(bookingId);
//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         // Retrieve the flight associated with the booking
//         const flight = await Airline.findById(booking.flight);
//         if (!flight) {
//             return res.status(404).json({ message: "Flight not found" });
//         }

//         // Increase the seat count for the flight
//         flight.seat++;

//         // Save the updated flight
//         await flight.save();

//         // Delete the booking
//         await Booking.deleteOne({ _id: bookingId });

//         res.status(200).json({ message: "Booking canceled successfully" });
//     } catch (error) {
//         console.error("Error canceling booking:", error);
//         res.status(500).json({ message: "Failed to cancel booking" });
//     }
// };


const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        // Find the booking to be canceled
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Retrieve the flight associated with the booking
        const flight = await Airline.findById(booking.flight);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        // Increase the seat count for the flight
        flight.seat++;

        // Save the updated flight
        await flight.save();

        // Delete the booking
        await Booking.deleteOne({ _id: bookingId });

        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        console.error("Error canceling booking:", error);
        res.status(500).json({ message: "Failed to cancel booking" });
    }
};


export {addBooking,getBookingById, getAllBookings, cancelBooking };