import express from 'express';
import { addPayment, createPaymentSession, sessionStatus } from '../../../controller/paymentController.js';
import isAuthenticated from "../../../middleware/userAuth.js"


const router = express.Router();



router.post("/create-checkout-session", isAuthenticated, createPaymentSession)
router.get("/session-status", isAuthenticated, sessionStatus)
router.post("/add-payment",isAuthenticated, addPayment)

export default router