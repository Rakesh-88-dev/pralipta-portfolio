import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendContactNotification = async (message) => {
  const mailOptions = {
    from: `"Pralipta Portfolio" <${process.env.GMAIL_USER}>`,
    to: process.env.PORTFOLIO_CONTACT_EMAIL,
    replyTo: message.email,

    subject: `New Portfolio Contact: ${
      message.subject || "No Subject"
    }`,

    text: `
You received a new message through Pralipta's portfolio.

Name: ${message.name}
Email: ${message.email}
Subject: ${message.subject || "No Subject"}

Message:
${message.message}

Received:
${new Date(message.createdAt || Date.now()).toLocaleString("en-IN")}
    `.trim(),

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #172033;">
        <h2 style="color: #123B68; margin-bottom: 8px;">
          New Portfolio Contact
        </h2>

        <p style="color: #526174; margin-bottom: 24px;">
          Someone has submitted a new message through the portfolio contact form.
        </p>

        <div style="border: 1px solid #E3EAF2; border-radius: 12px; padding: 20px; background: #F8FAFD;">
          <p>
            <strong>Name:</strong><br />
            ${message.name}
          </p>

          <p>
            <strong>Email:</strong><br />
            ${message.email}
          </p>

          <p>
            <strong>Subject:</strong><br />
            ${message.subject || "No Subject"}
          </p>
        </div>

        <div style="margin-top: 20px;">
          <p>
            <strong>Message:</strong>
          </p>

          <div style="border: 1px solid #E3EAF2; border-radius: 10px; padding: 16px; line-height: 1.6; white-space: pre-wrap;">
            ${message.message}
          </div>
        </div>

        <p style="margin-top: 24px; color: #7A8798; font-size: 13px;">
          Received from the Pralipta Portfolio contact form.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};