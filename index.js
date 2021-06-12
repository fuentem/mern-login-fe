const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const { db } = require('./models/user.model');
const app = express();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.verify.services.create({friendlyName: 'Login Authentication Service'})
.then(service => {
  app.locals.twilio_service_sid = service.sid;
});

mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on ' + process.env.PORT)
});