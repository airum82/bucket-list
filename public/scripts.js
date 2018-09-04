const fetchListItems = () => {
  return fetch('http://localhost:3000/api/v1/bucket-items')
    .then(response =>  response.json())
}

const deleteItem = () => {
  $(event.target).parent().remove();
}

const displayItems = (items) => {
  items.forEach(item => {
    $('.bucket-list').append(
      `<article>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="delete">delete</button>
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
        <h3>${title}</h3>
        <p>${description}</p>
        <button class="delete">delete</button>
        </article>`
  )
  $('.delete').on('click', deleteItem);
  postItem(title, description)
}

const postItem = (title, description) => {
  const body = {
    title,
    description
  }
  fetch('http://localhost:3000/api/v1/new-item',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => {
    return response.json();
  }).then(result => console.log(result))
}

$('.add-button').on('click', addItem)