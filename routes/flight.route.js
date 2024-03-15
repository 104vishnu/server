import express from "express";
import { flightDetails } from "../controllers/flightDetails.controller.js"

const router = express.Router();




router.post('/details',flightDetails);

export default router;