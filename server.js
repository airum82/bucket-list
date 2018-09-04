const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/bucket-items', (request, response) => {
  
});

app.post('/api/v1/new-item');

app.delete('api/v1/remove/:item');