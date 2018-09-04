let listItems = []

const fetchListItems = () => {
  return fetch('/api/v1/bucket-items')
    .then(response =>  response.json())
}

const deleteItem = () => {
  const id = $(event.target).parent().attr('id');
  deleteFromDatabase(id);
  $(event.target).parent().remove();
}

const deleteFromDatabase = (id) => {
  fetch(`/api/v1/remove/${id}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(result => console.log(result))
}

const displayItems = (items) => {
  listItems = [...listItems, ...items];
  items.forEach(item => {
    $('.bucket-list').append(
      `<article id=${item.id}>
        <button class="delete">delete</button>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        </article>`
      )
    $('.delete').on('click', deleteItem);
  })
}

$(document).ready(() => {
  fetchListItems()
    .then(result => {
      displayItems(result)
    })
})

const addItem = () => {
  event.preventDefault();
  const title = $('.title').val();
  const description = $('.description').val();
  if(!title || !description) {
    $('.error').text("Your item must have a title and description");
    return
  }
  $('.error').text('');
  postItem(title, description)
  .then(item => {
    listItems.push(item)
    $('.bucket-list').append(
      `<article id=${item.id}>
      <button class="delete">delete</button>
      <h3>${title}</h3>
      <p>${description}</p>
      </article>`
    )
    $('.delete').on('click', deleteItem);
    })
  resetForm();
}

const resetForm = () => {
  $('.title').val('');
  $('.description').val('');
}

const postItem = (title, description) => {
  const body = {
    title,
    description
  }
  return fetch('/api/v1/new-item',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => {
    return response.json();
  }).then(result => {
      body.id = result.id[0]
      return body
    })
}

$('.add-button').on('click', addItem)