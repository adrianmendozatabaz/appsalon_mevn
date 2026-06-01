import express from "express";
import { createService, getServices, getServicesById } from "../controllers/servicesController.js";


const router = express.Router();

router.post("/", createService);
router.get("/", getServices);
router.get("/:id", getServicesById);

export default router;
