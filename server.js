const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', require('./api/login'));
app.use('/api/register', require('./api/register'));
app.use('/api/send_alert', require('./api/send_alert'));
app.use('/api/get_alerts', require('./api/get_alerts'));
app.use('/api/update_status', require('./api/update_status'));
app.use('/api/delete_alert', require('./api/delete_alert'));
app.use('/api/send_message', require('./api/send_message'));
app.use('/api/get_messages', require('./api/get_messages'));

app.listen(3000, '0.0.0.0', function() {
  console.log('FidMed server running on http://0.0.0.0:3000');
});