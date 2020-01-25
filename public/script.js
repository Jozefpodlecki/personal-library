const refreshTimeout = 5000;
const [ getBookForm, addBookForm, addCommentForm, deleteBookForm, deleteBooksForm ] = document.forms;
const booksContainer = document.getElementById('books');
const bookContainer = document.getElementById('book');
const [ toolTip ] = document.getElementsByClassName('toolTip');
const hljs = window.hljs || {};
const url = window.url;

const tryParse = (str) => {
  try {
      return JSON.parse(str);
  } catch (error) {
      return null;
  }
}

const getFormUrlencoded = (params) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

const formCollectionToObject = (elements) => Object.keys(elements).reduce((acc, index) => {
  const element = elements[index];
  acc[element.name] = element.value;
  return acc;
}, {});

const getBooks = () => {
  
  fetch(`${url}api/books`)
  .then(response => response.json())
  .then(books => {

    const bookIds = books.map(pr => pr.id);
    const currentBookIds = [...booksContainer.children].map(pr => pr.dataset.id);
    
    if(currentBookIds.length === bookIds.length) {
      
      if(!currentBookIds.some(pr => !bookIds.includes(pr))) {
        return;
      }
    }
    
    while(booksContainer.lastChild) {
      booksContainer.removeChild(booksContainer.lastChild);
    }

    books.forEach(({_id, title}) => {

    const li = document.createElement("li");
      li.dataset.id = _id;
      const textNode = document.createTextNode(`id: ${_id} title: ${title}`);
      
      li.appendChild(textNode);
      li.classList.add("book-list-item");
      
      li.addEventListener('click', (event) => {
        toolTip.style.top = `${event.clientY - 30}px`;
        toolTip.style.left = `${event.clientX + 120}px`;
        toolTip.classList.add("toolTip--active");
        toolTip.appendChild(document.createTextNode(`Copied bookid to clipboard`));
        
        const { id } = event.target.dataset;
        navigator.clipboard.writeText(id);
        
        setTimeout(() => {
          toolTip.classList.remove("toolTip--active");
          toolTip.removeChild(toolTip.lastChild);
        }, 600);
      });
      booksContainer.appendChild(li);
    });
  })
  
  setTimeout(getBooks, refreshTimeout);
}

setTimeout(getBooks, 0);

getBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const elements = event.target.elements;
  const id = elements.id.value;

  fetch(`${url}api/books/${id}`)
  .then(response => response.text())
  .then(book => {
    
      while(bookContainer.lastChild) {
        bookContainer.removeChild(bookContainer.lastChild);
      }
    
      const text = book;
      const textNode = document.createTextNode(text);
      bookContainer.appendChild(textNode);
  })
  .catch(error => {
    while(bookContainer.lastChild) {
      bookContainer.removeChild(bookContainer.lastChild);
    }
    
    const textNode = document.createTextNode(error);
    bookContainer.appendChild(textNode);
  })
})

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const elements = form.elements;
  const obj = formCollectionToObject(elements);
  const data = getFormUrlencoded(obj);
  
  fetch(`${url}api/books/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: data
  })
  .then(response => response.text())
  .then(text => {
    form.reset();
  })
})

addCommentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const elements = form.elements;
  const obj = formCollectionToObject(elements);
  const data = getFormUrlencoded(obj);

  fetch(`${url}api/books/${obj.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: data
  })
    .then(response => response.text())
    .then(text => {
      form.reset();
  })
})

deleteBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const elements = form.elements;
  const id = elements.id.value;

  fetch(`${url}api/books/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.text())
  .then(text => {
    form.reset();
  })
})

deleteBooksForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const elements = event.target.elements;

  fetch(`${url}api/books`, {
    method: 'DELETE',
  })
  .then(response => response.text())
  .then(text => {

  })
})