let myLibrary = [];
let elementArray = [];
let result = '';

const statusForm = document.querySelector('.form-element.status-form');

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
  const classNameArray = ['title', 'author', 'rating', 'pages', 'review'];
  if(classNameArray.includes(className)){

    const div = document.createElement('div');
    div.textContent = element;
    div.classList.add(className);
    card.appendChild(div);

    const subtext = document.createElement('div');
    subtext.textContent = className;
    subtext.classList.add('subtext'); 
    card.appendChild(subtext);
  }
}

function createRadioDiv(card, status, element, className){
  if (className === 'finished' || className === 'current' || className === 'willread') {
    const statusForm = document.createElement('div');
    statusForm.classList.add('form-element', 'status-form');
    if (element === true) {
      result = 'checked';
    } else result = '';
    switch(className){  
      case ('finished'):
        statusForm.innerHTML = `
          <input type="radio" id="${className}" class="displayed-reading-status" name="reading-status" value="finished" ${result}>
          <label for="${className}">Finished Reading</label>`
        ;
        status.appendChild(statusForm);
        break;
      case ('current'):
        statusForm.innerHTML = `
          <input type="radio" id="${className}" class="displayed-reading-status" name="reading-status" value="finished" ${result}>
          <label for="${className}">Currently Reading</label>`
        ;
        status.appendChild(statusForm);
        break;
      case ('willread'):
        statusForm.innerHTML = `
          <input type="radio" id="${className}" class="displayed-reading-status" name="reading-status" value="finished" ${result}>
          <label for="${className}">Will Read</label>`
        ;
        status.appendChild(statusForm);
        break;
    }
  
  // console.log('status: ');
  // console.log(status)
  card.appendChild(status);

  } else if(className === 'status'){
    const subtext = document.createElement('div');
    subtext.textContent = className;
    subtext.classList.add('subtext'); 
    card.appendChild(subtext);
  } 
};

function createCard() {
  const content = document.querySelector('.content');
  const elementArray = ['title', 'author', 'rating', 'pages', 'review'];
  const radioArray = ['finished', 'current', 'willread', 'status'];
  
  for (let i = 0; i < myLibrary.length; i++) {
    const element = myLibrary[i];
    console.log(element);
    
    const card = document.createElement('div');
    card.classList.add('card');  
    const status = document.createElement('div');
    status.classList.add('result-status');

    // create divs for title, author, etc.
    for (let j = 0; j < elementArray.length; j++){
      const elementProperty = element[elementArray[j]];
      const propertyName = elementArray[j];

      createDiv(card, elementProperty, propertyName);
    }

    // create a div for radio buttons
    for (let k = 0; k < radioArray.length; k++){
      const radioProperty = element[radioArray[k]];
      const propertyName = radioArray[k];

      createRadioDiv(card, status, radioProperty, propertyName);
    }

    //create edit and del buttons
    const cardButtons = document.createElement('div') 
    cardButtons.classList.add('cardButtons');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('editBtn');
    cardButtons.appendChild(editBtn)
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delBtn');
    cardButtons.appendChild(delBtn);

    //attach buttons to card div, card to content div
    card.appendChild(cardButtons);
    content.appendChild(card);
  } 
}

// function attachStatusEventListeners() {
//   const radioInputs = document.querySelectorAll('.status-form .displayed-reading-status');
//   console.log(radioInputs);
//   radioInputs.forEach(input => {
//     input.addEventListener('change', (event) => {
//       console.log(myLibrary[willread]);
//       console.log('Event: ');
//       console.log(event);
//       // const radioName = event.target;
//       console.log('event.target ');
//       console.log(event.target)
//       console.log('event.target.value: ');
//       console.log(event.target.value);
//       const cardIndex = parseInt(event.target.closest('.card').dataset.index);
//       console.log('cardIndex: ' + cardIndex);
//       // myLibrary[cardIndex][radioName] = event.target.value; // Update the radio value in the book object
//     });
//   });
// }

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
  const content = document.querySelector('.content');
  content.textContent = '';
  createCard();
  // attachStatusEventListeners(); 
});



