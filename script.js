let myLibrary = [];
let elementArray = [];

const statusForm = document.querySelector('.form-element.status-form');
const content = document.querySelector('.content');

function Book(title, author, rating, pages, review, finished, notFinished) {
  this.title = title;
  this.author = author;
  this.rating = rating;
  this.pages = pages;
  this.review = review;
  this.finished = finished;
  this.notFinished = notFinished;
}

function addBookToLibrary(title, author, rating, pages, review, finished, notFinished) {
  document.querySelector('.popup').classList.remove('active');
  const book = new Book(title, author, rating, pages, review, finished, notFinished);
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

function createRadioDiv(card, status, element, className, cardNumber){
  if (className === 'finished' || className === 'notFinished') {
    const statusForm = document.createElement('div');
    statusForm.classList.add('form-element', 'status-form', `${cardNumber}`);
    let result = '';
    if (element === true) {
      result = 'checked';
    } else result = '';
    switch(className){  
      case ('finished'):
        statusForm.innerHTML = `
          <input type="radio" id="${className}" class="displayed-reading-status" name="reading-status-${cardNumber}" value="finished" ${result}>
          <label for="${className}">Finished Reading</label>`
        ;
        status.appendChild(statusForm);
        break;
      case ('notFinished'):
        statusForm.innerHTML = `
          <input type="radio" id="${className}" class="displayed-reading-status" name="reading-status-${cardNumber}" value="notFinished" ${result}>
          <label for="${className}">Currently Reading / Will Read</label>`
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
  const radioArray = ['finished', 'notFinished', 'status'];
  
  for (let i = 0; i < myLibrary.length; i++) {
    const element = myLibrary[i];
    console.log(element);
    
    const card = document.createElement('div');
    card.classList.add('card');  

    card.dataset.index = i;

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
      console.log('Radio Property: ', radioProperty);
      const propertyName = radioArray[k];

      createRadioDiv(card, status, radioProperty, propertyName, card.dataset.index);
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
    deleteEventListener(delBtn, card.dataset.index);

    //attach buttons to card div, card to content div
    card.appendChild(cardButtons);
    content.appendChild(card);
  } 
}

function statusEventListeners() {
  const radioInputs = document.querySelectorAll('.status-form .displayed-reading-status');
  radioInputs.forEach(input => {
    input.addEventListener('change', (event) => {
      const currentCardIndex = parseInt(event.target.closest('.card').dataset.index);
      for (let l = 0; l < radioInputs.length; l++){
        myLibrary[currentCardIndex][radioInputs[l].value] = false;
        // console.log(myLibrary[cardIndex][radioInputs[l].value]);
      }
      // console.log('event.target.value' + event.target.value);
      myLibrary[currentCardIndex][`${event.target.value}`] = true;
      console.log(myLibrary);
    });
  });
}

function deleteEventListener(delBtn, cardIndex){
  delBtn.addEventListener('click', () => {
    myLibrary.splice(`${cardIndex}`, 1);
    content.innerHTML = '';
    createCard();
    console.log(myLibrary);
  })
}


function getFormInput() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const rating = document.getElementById('rating').value;
  const pages = document.getElementById('pages').value;
  const review = document.getElementById('review').value;
  const finished = document.getElementById('finished').checked;
  const notFinished = document.getElementById('notFinished').checked;
  return { title, author, rating, pages, review, finished, notFinished };
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
  const { title, author, rating, pages, review, finished, notFinished } = getFormInput();
  addBookToLibrary(title, author, rating, pages, review, finished, notFinished);
  const content = document.querySelector('.content');
  content.textContent = '';
  createCard();
  statusEventListeners();
});



