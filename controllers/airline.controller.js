// airlineController.js
import Airline from "../models/airline.model.js";

// Controller to handle adding a new airline
export const addAirline = async (req, res) => {
    try {
        const {
            airlineName,
            airlineNo,
            airlineImage,
            arrivalTime,
            departureTime,
            travelTime,
            from,
            to,
            date,
            seat,
            fare,
            operatingDays
        } = req.body;

        //check for all fields are coming or not

        const newAirline = new Airline({
            airlineName,
            airlineNo,
            airlineImage,
            arrivalTime,
            departureTime,
            travelTime,
            from,
            to,
            date,
            seat,
            fare,
            operatingDays
        });

        const savedAirline = await newAirline.save();

        res.status(201).json(savedAirline);
    } catch (error) {
        console.error("Error adding airline:", error);
        res.status(500).json({ error: "Failed to add airline" });
    }
};

// Controller to handle retrieving all airlines
export const getAllAirlines = async (req, res) => {
    try {
        const airlines = await Airline.find({});
        res.status(200).json(airlines);
    } catch (error) {
        console.error("Error retrieving airlines:", error);
        res.status(500).json({ error: "Failed to retrieve airlines" });
    }
};

// Controller to handle retrieving a single airline by ID
export const getAirlineById = async (req, res) => {
    try {
        const airline = await Airline.findById(req.params.id);
        if (!airline) {
            return res.status(404).json({ message: "Airline not found" });
        }
        res.status(200).json(airline);
    } catch (error) {
        console.error("Error retrieving airline:", error);
        res.status(500).json({ error: "Failed to retrieve airline" });
    }
};

// Controller to handle updating an existing airline
export const updateAirline = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAirline = await Airline.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAirline) {
            return res.status(404).json({ message: "Airline not found" });
        }
        res.status(200).json(updatedAirline);
    } catch (error) {
        console.error("Error updating airline:", error);
        res.status(500).json({ error: "Failed to update airline" });
    }
};

// Controller to handle deleting an existing airline
export const deleteAirline = async (req, res) => {
    try {
        const deletedAirline = await Airline.findByIdAndDelete(req.params.id);
        if (!deletedAirline) {
            return res.status(404).json({ message: "Airline not found" });
        }
        res.status(200).json({ message: "Airline deleted successfully" });
    } catch (error) {
        console.error("Error deleting airline:", error);
        res.status(500).json({ error: "Failed to delete airline" });
    }
};
