const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('../firebase-service-key.json'); // adjust path!

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const corsOptions = {
  origin: 'https://sih-hackthon-alpha.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

let tokens = [];

app.post('/register-token', (req, res) => {
  const { token } = req.body;
  if (token && !tokens.includes(token)) tokens.push(token);
  res.send({ status: 'token registered' });
});

app.post('/trigger-alert', async (req, res) => {
  const { disaster, message } = req.body;
  const notification = {
    title: `⚠️ ${disaster} ALERT!`,
    body: `Tap to see alert: ${message}`,
    disaster,
    message
  };
  const payload = {
    notification: {
      title: notification.title,
      body: notification.body
    },
    data: {
      disaster: disaster,
      message: message
    }
  };
  try {
    const response = await admin.messaging().sendMulticast({
      ...payload,
      tokens
    });
    res.send({ status: 'Alert sent', success: response.successCount, failure: response.failureCount });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// DO NOT use app.listen() on Vercel!
module.exports = app; // <-- THIS is the Vercel handler