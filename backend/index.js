import express from "express";
import servicesRoutes from './routes/servicesRoutes.js'

//* Config
const app = express();

//* Route
app.use('/api/services', servicesRoutes)

//* Port
const PORT = process.env.PORT || 4000;

//* Run app
app.listen(PORT, () => {
  console.log("El servidor se esta ejecutando en el puerto:", PORT);
});
