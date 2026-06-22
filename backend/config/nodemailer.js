import nodemailer from "nodemailer";

// Create a transporter using SMTP
export function createTransport(host, port, user, pass) {
  return nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  });
}
