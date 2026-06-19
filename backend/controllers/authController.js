import User from "../models/User.js";

const register = async (req, res) => {
  //* Validate all fields
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  //* Validate duplicate registers
  const { email, password, nombre } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Usuario ya registrado");

    return res.status(400).json({
      msg: error.message,
    });
  }

  //* Validate extension password
  try {
    const user = User(req.body);
    await user.save();

    res.json({
      msg: "El usuario se creo con éxito, revisa tu email.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { register };
