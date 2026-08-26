import Appointment from "../models/Appointment.js";
import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import {
  handleNotFoundError,
  validateObjectId,
  formatDate,
} from "../utils/index.js";
import { sendEmailNewAppointment } from "../emails/appointmentEmailService.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();

  try {
    const newAppointment = new Appointment(appointment);
    const result = await newAppointment.save();

    await sendEmailNewAppointment({
      date: formatDate(result.date),
      time: result.time,
    });

    res.json({
      msg: "Tu reservación se realizo correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAppointmentsByDate = async (req, res) => {
  const { date } = req.query;
  const newDate = parse(date, "dd/MM/yyyy", new Date());

  if (!isValid(newDate)) {
    const error = new Error("Fecha no valida.");
    return res.status(401).json({ msg: error.message });
  }

  const isoDate = formatISO(newDate);

  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay(new Date(isoDate)),
      $lte: endOfDay(new Date(isoDate)),
    },
  }).select("time");

  res.json(appointments);
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  //* Validate object id
  if (validateObjectId(id, res)) return;

  //* Valide exists
  const appointment = await Appointment.findById(id).populate("services");

  if (!appointment) {
    return handleNotFoundError("La cita no existe.", res);
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos");

    return res.status(403).json({ msg: error.message });
  }

  res.json(appointment);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;

  //* Validate object id
  if (validateObjectId(id, res)) return;

  //* Valide exists
  const appointment = await Appointment.findById(id).populate("services");

  if (!appointment) {
    return handleNotFoundError("La cita no existe.", res);
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos");

    return res.status(403).json({ msg: error.message });
  }

  const { date, time, totalAmount, services } = req.body;
  appointment.date = date;
  appointment.time = time;
  appointment.totalAmount = totalAmount;
  appointment.services = services;

  try {
    const result = await appointment.save();

    res.json({
      msg: "Cita actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  //* Validate object id
  if (validateObjectId(id, res)) return;

  //* Valide exists
  const appointment = await Appointment.findById(id).populate("services");

  if (!appointment) {
    return handleNotFoundError("La cita no existe.", res);
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos");

    return res.status(403).json({ msg: error.message });
  }

  try {
    await appointment.deleteOne();

    res.json({
      msg: "Cita cancelada correctamente",
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
