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
  const checkFormat = Object.values(item).filter(value => {
    return value.length > 0;
  })
  if(checkFormat.length !== 2) {
    return response.status(400).json('Error: invalid format')
  }
  item.title = item.title.toLowerCase();
  item.description = item.description.toLowerCase();
  database('list_items').insert(item, 'id')
    .then(id => {
      return response.status(201).json({ message: 'New item added!', id})
    })
    .catch(err => {
      return response.status(404).json('Missing title or description or invalid format')
    })
});

app.delete('/api/v1/remove/:id', (request, response) => {
  database('list_items').where('id', request.params.id).select().del()
    .then(result => {
      if(result > 0) {
        return response.status(200).json("item was successfully deleted");
      } else {
        return response.status(404).json('item was not found');
      }
    })
    .catch(err => {
      return response.status(404).json(`Error: ${title} was not found`);
    })
});

app.listen(app.get('port'), () => {
  console.log(`Bucket List is running on ${app.get('port')}`)
})

module.exports = app;