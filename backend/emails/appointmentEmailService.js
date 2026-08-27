import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
  );

  //* Enviar email
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: 'admin@appsalon.com',
    subject: "AppSalon - Nueva cita",
    text: "AppSalon - Nueva cita",
    html: `<p>Hola: tienes una nueva cita</p>
       <p>La cita sera el dia ${date} a las ${time} horas.</p> 
      `,
  });

  console.log("res", info.messageId);
}

export async function sendEmailUpdateAppointment({ date, time }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
  );

  //* Enviar email
  const info = await transporter.sendMail({
    from: "AppSalon <citas@appsalon.com>",
    to: 'admin@appsalon.com',
    subject: "AppSalon - Actualización de cita",
    text: "AppSalon - Actualización de cita",
    html: `<p>Hola: un usuario ha actualizado su cita</p>
       <p>La nueva cita será el dia ${date} a las ${time} horas.</p> 
      `,
  });

  console.log("res", info.messageId);
}