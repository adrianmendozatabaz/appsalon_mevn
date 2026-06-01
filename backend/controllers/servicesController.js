import mongoose from "mongoose";
import { services } from "../data/beautyServices.js";
import Services from "../models/Services.js";
import { validateObjectId } from "../utils/index.js";

const createService = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const service = new Services(req.body);
    const result = await service.save();

    res.json({
      msg: "El servicio se creo con éxito.",
    });
  } catch (error) {
    console.log(error);
  }
};

const getServices = (req, res) => {
  res.json(services);
};

const getServicesById = async (req, res) => {
  const { id } = req.params;

  //* Validate object Id
  if (validateObjectId(id, res)) return;

  //* Validate if exists
  const service = await Services.findById(id);

  if (!service) {
    const error = new Error("No se encontró el servicio solicitado.");

    return res.status(404).json({
      msg: error.message,
    });
  }

  //* return service
  res.json(service);
};

const updateService = async (req, res) => {
  const { id } = req.params;

  //* Validate object Id
  if (validateObjectId(id, res)) return;

  //* Validate if exists
  const service = await Services.findById(id);

  if (!service) {
    const error = new Error("No se encontró el servicio solicitado.");

    return res.status(404).json({
      msg: error.message,
    });
  }

  //* Set new values
  service.name = req.body.name || service.name;
  service.price = req.body.price || service.price;

  try {
    await service.save();

    res.json({
      msg: "El servicio se actualizo de forma correcta.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { createService, getServices, getServicesById, updateService };
