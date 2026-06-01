import express from "express";
import { createService, getServices, getServicesById, updateService } from "../controllers/servicesController.js";


const router = express.Router();

router.post("/", createService);
router.get("/", getServices);
router.get("/:id", getServicesById);
router.put("/:id", updateService);

export default router;
