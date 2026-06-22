import { createTransport } from "../config/nodemailer.js";

export async function sendEmailVerification() {
  const transporter = createTransport(
    "sandbox.smtp.mailtrap.io",
    2525,
    "144b11e3e3d58f",
    "1604e8f57cfe40",
  );

  //* Enviar email
  const info = await transporter.sendMail({
    from: "AppSalon",
    to: "correo@correo.com",
    subject: "AppSalon - Confirma tu cuenta",
    text: "AppSalon - Confirma tu cuenta",
    html: "Desde email",
  });

  console.log("res", info.messageId);
}
