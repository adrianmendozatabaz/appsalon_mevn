import dotenv from "dotenv";
import Services from "../models/Services.js";
import { db } from "../config/db.js";
import { services } from "../data/beautyServices.js";
import colors from "colors";

dotenv.config();

await db();

async function seedDB() {
  try {
    await Services.insertMany(services);
    console.log(colors.green.bold("Los registros se insertaron con éxito."));
    process.exit();
  } catch (error) {
    console.log(colors.red.bold(error));
    process.exit(1);
  }
}

function clearDB() {
  console.log("clear");
}

if (process.argv[2] === "--import") {
  seedDB();
} else {
  clearDB();
}
