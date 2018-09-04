const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/bucket-items', (request, response) => {
  return response.json('oh hello');
});

app.post('/api/v1/new-item', (request, response) => {
  
});

app.delete('api/v1/remove/:item', (request, response) => {
  
});

app.listen(app.get('port'), () => {
  console.log(`Bucket List is running on ${app.get('port')}`)
})