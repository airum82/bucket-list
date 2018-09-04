const fetchListItems = () => {
  return fetch('/api/v1/bucket-items')
    .then(response =>  response.json())
}

const deleteItem = () => {
  const title = $(event.target).siblings('h3').text().toLowerCase();
  deleteFromDatabase(title);
  $(event.target).parent().remove();
}

const deleteFromDatabase = (title) => {
  fetch(`/api/v1/remove/${title}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(result => console.log(result))
}

const displayItems = (items) => {
  items.forEach(item => {
    $('.bucket-list').append(
      `<article>
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
  $('.bucket-list').append(
    `<article>
        <button class="delete">delete</button>
        <h3>${title}</h3>
        <p>${description}</p>
      </article>`
  )
  $('.delete').on('click', deleteItem);
  postItem(title, description)
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
  fetch('/api/v1/new-item',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => {
    return response.json();
  }).then(result => console.log(result))
}

$('.add-button').on('click', addItem)