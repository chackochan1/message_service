const express = require("express");
const request = require('request');
const app = express();

const accountSid = ' ';
const authToken = ' ';
const client = require('twilio')(accountSid, authToken);

const numbers = [''];

function sendMessage() {
  var category = 'money';
  request.get({
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: {
      'X-Api-Key': 'Oa2noOJNZXyS8/iC+xdfEQ==Nyk2IwcOU47ynHri'
    },
  }, function(error, response, body) {
    if (error) return console.error('Request failed:', error);
    else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else {
      const quote = JSON.parse(body)[0].quote;

      // Send message to each number in the array
      numbers.forEach(number => {
        client.messages
          .create({
            body: quote,
            from: '+18149149440',
            to: number
          })
          .then(message => console.log('Message sent to', number, 'with SID:', message.sid))
          .catch(err => console.error('Error sending message to', number, ':', err));
      });

      console.log(quote);
    }
  });
}

// Send the first message immediately
//sendMessage();

// Send messages every 5 minutes
const interval = setInterval(sendMessage, 8  * 60 * 1000);

// Set up the server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
