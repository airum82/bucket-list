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
app.use(express.static('public'));

app.get('/api/v1/bucket-items', (request, response) => {
  database('list_items').select()
    .then(listItems => {
      return response.status(200).json(listItems);
    })
});

app.post('/api/v1/new-item', (request, response) => {
  const item = request.body;
  const checkFormat = Object.keys(item).filter(key => {
    return key === 'title' || key === 'description'
  })
  if(checkFormat.length !== 2 || Object.keys(item).length !== 2) {
    return response.json('Error: invalid format')
  }
  item.title = item.title.toLowerCase();
  item.description = item.description.toLowerCase();
  database('list_items').insert(item, 'id')
    .then(() => {
      return response.status(201).json('New item added!')
    })
    .catch(err => {
      return response.json('Missing title or description or invalid format')
    })
});

app.delete('/api/v1/remove/:title', (request, response) => {
  const title = request.params.title.toLowerCase();
  database('list_items').where('title', title).select().del()
    .then(() => {
      return response.status(200).json(`${title} was successfully deleted`);
    })
    .catch(err => {
      return response.status(404).json(`Error: ${title} was not found`);
    })
});

app.listen(app.get('port'), () => {
  console.log(`Bucket List is running on ${app.get('port')}`)
})