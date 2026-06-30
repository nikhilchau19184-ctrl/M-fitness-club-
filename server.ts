import express from "express";
import path from "path";
import cors from "cors";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let twilioClient: twilio.Twilio | null = null;
let hasTwilioConfig = false;

function initTwilio() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (accountSid && authToken) {
    twilioClient = twilio(accountSid, authToken);
    hasTwilioConfig = true;
  }
}

initTwilio();

// API routes
app.post("/api/notify", async (req, res) => {
  try {
    const { phone, name, username, password } = req.body;
    
    if (!phone || !name || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const message = `Welcome to the M Fitness Family, ${name}! 🎉\n\nLog in to your member portal using:\nUsername: ${username}\nPassword: ${password}\n\nPortal Link: mfitness.club/login`;

    if (hasTwilioConfig && twilioClient) {
      const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
      if (!twilioPhone) {
        throw new Error("TWILIO_PHONE_NUMBER not configured.");
      }

      await twilioClient.messages.create({
        body: message,
        from: twilioPhone,
        to: phone
      });
      res.json({ success: true, message: "Notification sent successfully via Twilio" });
    } else {
      // Simulate SMS Delivery
      console.log(`\n--- SIMULATED SMS TO ${phone} ---`);
      console.log(message);
      console.log(`----------------------------------\n`);
      res.json({ success: true, message: "Notification simulated successfully", simulated: true });
    }
  } catch (error: any) {
    console.error("Failed to send notification:", error);
    res.status(500).json({ error: error.message || "Failed to send notification" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
