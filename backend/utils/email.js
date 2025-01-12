import nodemailer from "nodemailer";

export async function sendEmail(to, subject, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "pk181299@gmail.com",
        pass: "fzrumwvyfyypoeea",
      },
    });

    const mailOptions = {
      from: "CV Builder",
      to: `${to}`,
      subject: `${subject}`,
      html: `${body}`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
}
