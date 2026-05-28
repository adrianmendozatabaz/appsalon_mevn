import express from "express";
import servicesRoutes from './routes/servicesRoutes.js';
import dotenv from 'dotenv';
import { db } from "./config/db.js";

//* Variables
dotenv.config();

//* Config
const app = express();

//* Connect to db
db();

//* Route
app.use('/api/services', servicesRoutes)

//* Port
const PORT = process.env.PORT || 4000;

//* Run app
app.listen(PORT, () => {
  console.log("El servidor se esta ejecutando en el puerto:", PORT);
});
