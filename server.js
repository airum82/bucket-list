const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV ||
'development';
const configuration = require('./knexfile')
[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/bucket-items', (request, response) => {
  database('list_items').select()
    .then(listItems => {
      return response.status(200).json(listItems);
    })
});

app.post('/api/v1/new-item', (request, response) => {
  
});

app.delete('api/v1/remove/:item', (request, response) => {

});

app.listen(app.get('port'), () => {
  console.log(`Bucket List is running on ${app.get('port')}`)
})