const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/api/status', function(request, response) {
  response.send({ status: 'OK' });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
