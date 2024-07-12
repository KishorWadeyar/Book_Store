import express from "express";
import { order } from "../controller/order.controller.js";

const router = express.Router();

router.post("/order", order);

export default router;
