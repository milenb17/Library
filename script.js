let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (read) {return `${title} by ${author}, ${pages} pages, read.`}
        else {return `${title} by ${author}, ${pages} pages, not read yet.`}
    }
}

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read = false;
    }
    else {this.read = true;}
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const display = document.querySelector(".Books");
    display.innerHTML = '';
    const table = document.createElement('table');
    const header = document.createElement('tr');
    let title = document.createElement('th');
    title.textContent = 'Title';
    header.appendChild(title);
    let author = document.createElement('th');
    author.textContent = 'Author';
    header.appendChild(author);
    let pages = document.createElement('th');
    pages.textContent = 'Pages';
    header.appendChild(pages);
    let read = document.createElement('th');
    read.textContent = 'Read?';
    header.appendChild(read);
    let remove = document.createElement('th');
    remove.textContent = 'Remove?';
    header.appendChild(remove);
    table.appendChild(header);
    let row;
    let i = 0;
    for (const book of myLibrary) {
        row = document.createElement('tr');
        title = document.createElement('td');
        title.textContent = book.title;
        author = document.createElement('td');
        author.textContent = book.author;
        pages = document.createElement('td');
        pages.textContent = book.pages.toString();
        read = document.createElement('td');
        read.textContent = book.read.toString();
        read.innerHTML += `<button class="toggle" data-index="${i}">Toggle</button>`;
        
        
        
        remove = document.createElement('td');
        remove.innerHTML = `<button class="remove" data-index="${i}">Remove</button>`;

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        row.appendChild(remove);
        table.appendChild(row);
        i++;
    }
    display.appendChild(table);
    let th = Array.from(document.querySelectorAll('th'));
    th.forEach((currentElement) => currentElement.classList.add('table'));
    let td = Array.from(document.querySelectorAll('td'));
    td.forEach((currentElement) => currentElement.classList.add('table'));
    table.classList.add('table');
    removeBook();
    toggleButton();
}
function newBook() {
    let button = document.querySelector('#new');
    let div = document.querySelector('.form');
    button.addEventListener('click', function() {
        let titleInput = document.createElement('input');
        let titleLable = document.createElement('label');
        titleInput.setAttribute('id', 'title');
        titleLable.setAttribute('for', 'title');
        titleLable.textContent = 'Title';
        let authorInput = document.createElement('input');
        let authorLable = document.createElement('label');
        authorInput.setAttribute('id', 'author');
        authorLable.setAttribute('for', 'author');
        authorLable.textContent = 'Author';
        let pagesInput = document.createElement('input');
        pagesInput.setAttribute('type', 'number');
        let pagesLable = document.createElement('label');
        pagesInput.setAttribute('id', 'pages');
        pagesLable.setAttribute('for', 'pages');
        pagesLable.textContent = 'Pages';
        let readInput = document.createElement('input');
        let readLable = document.createElement('label');
        readInput.setAttribute('id', 'read');
        readInput.setAttribute('type', 'checkbox');
        readLable.setAttribute('for', 'read');
        readLable.textContent = 'Read?';
        let submit = document.createElement('button');
        submit.textContent = 'Submit';
        submit.setAttribute('id', 'submit');
        div.appendChild(titleLable);
        div.appendChild(titleInput);
        div.appendChild(authorLable);
        div.appendChild(authorInput);
        div.appendChild(pagesLable);
        div.appendChild(pagesInput);
        div.appendChild(readLable);
        div.appendChild(readInput);
        div.appendChild(submit);
        submit.addEventListener('click', function() {
            let newbook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
            addBookToLibrary(newbook);
            displayBooks();
            div.innerHTML = '';
        })
    })
}

function removeBook() {
    let buttons = Array.from(document.querySelectorAll('.remove'));
    buttons.forEach(button => button.addEventListener('click', function(e) {
        let index = e.target.getAttribute("data-index");
        myLibrary.splice(index, 1);
        displayBooks();
    }));
}

function toggleButton() {
    let buttons = Array.from(document.querySelectorAll('.toggle'));
    buttons.forEach(button => button.addEventListener('click', function(e) {
        let index = e.target.getAttribute("data-index");
        myLibrary[index].toggleRead();
        displayBooks();
    }));
}

let book1 = new Book('book1', 'author1', 1, true);
let book2 = new Book('book2', 'author2', 23, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
displayBooks();
newBook();
