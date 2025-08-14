import Twilio from "twilio";

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // WhatsApp sandbox number
      to: `whatsapp:${to}`, // Ensure "whatsapp:" prefix
      body
    });
    return message;
  } catch (err) {
    console.error("Twilio Error:", err.message);
    throw err;
  }
};
