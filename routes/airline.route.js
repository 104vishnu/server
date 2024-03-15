import {Router} from 'express';
import { addAirline,getAllAirlines,getAirlineById,deleteAirline} from '../controllers/airline.controller.js';
import { Authenticate, AuthorizeAdmin } from '../middlewares/authenticate.middleware.js';

const router = Router();


router.post('/airline', AuthorizeAdmin, addAirline);
router.get('/getAllAirlines', AuthorizeAdmin,getAllAirlines);
router.get('/getAirlineById', AuthorizeAdmin,getAirlineById);
router.delete('/deleteAirline', AuthorizeAdmin,deleteAirline);


export default router;