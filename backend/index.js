import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { db } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

//* Variables
dotenv.config();

//* Config
const app = express();

//* Read data from body
app.use(express.json());

//* Connect to db
db();

//* Configure CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    // if (whiteList.includes(origin)) {
    if (whiteList) {
      //* allow connection
      callback(null, true);
    } else {
      //* Not allow connection
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));

//* Route
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

//* Port
const PORT = process.env.PORT || 4000;

//* Run app
app.listen(PORT, () => {
  console.log(
    colors.blue("El servidor se esta ejecutando en el puerto:", PORT),
  );
});
