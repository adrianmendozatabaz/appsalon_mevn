import express from "express";

//* Config
const app = express();

//* Route
app.get("/", (req, res) => {
  res.send("Hola");
});

//* Port
const PORT = process.env.PORT || 4000;

//* Run app
app.listen(PORT, () => {
  console.log("El servidor se esta ejecutando en el puerto:", PORT);
});
