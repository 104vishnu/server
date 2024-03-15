import Airline from "../models/airline.model.js";

export const flightDetails = async (req, res) => {
    try {
        console.log("flightdetails");
        const { airlineName, date, airlineNo, from, to } = req.body;

        console.log(airlineName, date, airlineNo, from, to);

        // Check if at least one search criteria is provided
        if (!airlineName && !date && !airlineNo && !from && !to) {
            return res.status(400).json({
                success: false,
                message: "At least one search criteria is required",
            });
        }

        // Initialize query object
        let query = {};

        // Add search criteria to the query
        if (airlineName) {
            query.airlineName = { $regex: airlineName, $options: "i" };
        }

        if (date) {
            // Extract day of the week from the provided date
            const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
            // Add day of the week to the query
            query.operatingDays = { $in: [dayOfWeek] };
        }

        if (airlineNo) {
            query.airlineNo = airlineNo;
        }

        if (from) {
            query.from = from;
        }

        if (to) {
            query.to = to;
        }

        // Search for flights based on the constructed query
        const flights = await Airline.find(query);

        if (flights.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No flights found matching the search criteria",
            });
        }

        // Return the matching flights
        res.status(200).json({
            success: true,
            flights: flights,
        });
    } catch (error) {
        console.error("Error searching flights:", error);
        res.status(500).json({ success: false, message: "Failed to search flights" });
    }
};
