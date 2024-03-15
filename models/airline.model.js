import mongoose, { Schema } from "mongoose";

const airlineSchema = new Schema({
    airlineName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    airlineNo: {
        type: String,
        required: true,
        unique: true,
    },
    airlineImage: {
        type: String,
        required: false,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    travelTime: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    seat: {
        type: Number,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    operatingDays: [
        {
            type: String,
            enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            required: true,
        }
    ]
}, {
    timestamps: true,
});

export default mongoose.model("Airline", airlineSchema);
