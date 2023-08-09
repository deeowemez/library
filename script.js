let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  document.querySelector('.popup').classList.remove('active');
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const rating = document.getElementById('rating').value;
  const pages = document.getElementById('pages').value;
  const review = document.getElementById('review').value;
  const finished = document.getElementById('finished').checked;
  const current = document.getElementById('current').checked;
  const willread = document.getElementById('willread').checked;
  console.log(`${title}, ${author}`)
  
}

function createCard(){
  
}


// start popup div & create a new book
const newbook = document.getElementById('new-book');
newbook.addEventListener('click', () => {
  document.querySelector('.popup').classList.add('active');
});

// close popup div 
const closebtn = document.querySelector('.popup .close-btn')
closebtn.addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('active');
});

//submit button in popup 
// const submit =  document.querySelector('#submit');
// submit.addEventListener('click', (event) => {
//   event.preventDefault();
//   addBookToLibrary();
// });

//submit button in popup 
const form =  document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary();
});
