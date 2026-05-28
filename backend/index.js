import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import servicesRoutes from './routes/servicesRoutes.js';
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
  console.log(colors.blue("El servidor se esta ejecutando en el puerto:", PORT));
});
