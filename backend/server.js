const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./firebase-service-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
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
    },
    tokens: tokens
  };
  const response = await admin.messaging().sendMulticast(payload);
  res.send({ status: 'Alert sent', success: response.successCount });
});

app.listen(process.env.PORT, () => console.log('Backend running on port', process.env.PORT));