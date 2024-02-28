const addBookButton = document.querySelector('#addBookButton');
const addBookMenu = document.querySelector('.addBookMenu');
const addBookForm = document.querySelector('#addBookForm');
const bookContainer = document.querySelector('.bookContainer');
const readButtons = document.querySelectorAll('.bookRead');
const myLibrary = [];

addBookButton.addEventListener('click', () => {
    addBookMenu.classList.toggle('wrap');
})

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('hey');
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var read = document.getElementById('readCheck').checked;
    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('readCheck').checked = false;

})

readButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('readTrue');
        e.target.classList.toggle('readFalse');
    })
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.toggle('bookCard');


    let bookTitle = document.createElement('div');
    bookTitle.classList.toggle('bookTitle')
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);


    let deleteCardButton = document.createElement('button');
    deleteCardButton.classList.toggle('deleteCardButton');
    deleteCardButton.textContent = 'X';
    bookTitle.appendChild(deleteCardButton);

    deleteCardButton.addEventListener('click', (e) => {
        const bookIndex = e.target.parentElement.getAttribute('data-index');
        deleteBook(bookIndex)
    })
    
    let bookAuthor = document.createElement('div');
    bookAuthor.classList.toggle('bookAuthor');
    bookAuthor.textContent = `Author: ${book.author}`;
    bookCard.appendChild(bookAuthor);

    let bookPages = document.createElement('div');
    bookPages.classList.toggle('bookPages')
    bookPages.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(bookPages);

    let button = document.createElement('button');
    button.classList.toggle('bookRead');
    book.read == true ? button.classList.toggle('readTrue'):button.classList.toggle('readFalse');
    book.read == true ? button.textContent = 'Read' : button.textContent = 'Not Read';
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('readTrue');
        e.target.classList.toggle('readFalse');
        button.textContent == 'Read' ? button.textContent = 'Not Read' : button.textContent = 'Read';
    })
    bookCard.appendChild(button);

    myLibrary.push(bookCard);
    displayBooks()

    function displayBooks(){
        bookContainer.innerHTML = '';
        for(i = 0; i < myLibrary.length; i++){
            bookContainer.appendChild(myLibrary[i]);
        }
    }

    function deleteBook(index){
        myLibrary.splice(index, 1);
        displayBooks();
    }


    
}
