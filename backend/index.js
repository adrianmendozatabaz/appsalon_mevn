import express from "express";
import { db } from "./config/db.js";
import servicesRoutes from './routes/servicesRoutes.js'

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
