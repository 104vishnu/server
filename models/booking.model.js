// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   flight: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Airline",
//   },
// });

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airline",
  },
  bookingId:{
    type:String,
    require:true,
    unique:true
  }
});

export default mongoose.model("Booking", bookingSchema);