let myLibrary = [];
let elementArray = [];

function Book(title, author, rating, pages, review, finished, current, willread) {
  this.title = title
  this.author = author
  this.rating = rating
  this.pages = pages
  this.review = review
  this.finished = finished
  this.current = current
  this.willread = willread
}

function addBookToLibrary(title, author, rating, pages, review, finished, current, willread) {
  document.querySelector('.popup').classList.remove('active');
  const book = new Book(title, author, rating, pages, review, finished, current, willread);
  myLibrary.push(book);
  console.log(myLibrary);
}

function clearFormInput(){
  const form = document.querySelector('form');
  const formElements = form.elements;
  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    if (element.type === 'text' || element.type === 'number' || element.type === 'textarea') {
      element.value = '';
    } else if (element.type === 'checkbox' || element.type === 'radio') {
      element.checked = false;
    }
  }
}

function createDiv(card, element, className) {
  const div = document.createElement('div');
  div.textContent = element;
  div.classList.add(className);
  card.appendChild(div);

  const subtext = document.createElement('div');
  subtext.textContent = className;
  subtext.classList.add('subtext'); 
  card.appendChild(subtext);
}


function createCard() {
  const content = document.querySelector('.content');
  // const elementArray = ['title', 'author', 'rating', 'pages', 'review', 'finished', 'current', 'willread'];
  const elementArray = ['title', 'author', 'rating', 'pages', 'review'];

  for (let i = 0; i < myLibrary.length; i++) {
    const element = myLibrary[i];
    console.log(element);
    
    const card = document.createElement('div');
    card.classList.add('card');  

    for (let j = 0; j < elementArray.length; j++){
      const elementProperty = element[elementArray[j]];
      const propertyName = elementArray[j];

      createDiv(card, elementProperty, propertyName);
    }

    content.appendChild(card);
  } 
}


function getFormInput() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const rating = document.getElementById('rating').value;
  const pages = document.getElementById('pages').value;
  const review = document.getElementById('review').value;
  const finished = document.getElementById('finished').checked;
  const current = document.getElementById('current').checked;
  const willread = document.getElementById('willread').checked;
  
  return { title, author, rating, pages, review, finished, current, willread };
}


// start popup div & create a new book
const newbook = document.getElementById('new-book');
newbook.addEventListener('click', () => {
  document.querySelector('.popup').classList.add('active');
  clearFormInput();
});

// close popup div 
const closebtn = document.querySelector('.popup .close-btn')
closebtn.addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('active');
});

//submit button in popup 
const form =  document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { title, author, rating, pages, review, finished, current, willread } = getFormInput();
  addBookToLibrary(title, author, rating, pages, review, finished, current, willread);
  const content = document.querySelector('.content')
  content.textContent = '';
  createCard();
});
