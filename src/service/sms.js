const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';

const client = new twilio(accountSid, authToken);

// Send SMS
client.messages
  .create({
    body: 'Hello from Node.js using Twilio!',  
    from: '+12345678901',                     
    to: '+918826616653'                       
  })
  .then(message => {
    console.log(`Message sent! SID: ${message.sid}`);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });