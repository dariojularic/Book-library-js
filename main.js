import './style.css'

const addBookBtn = document.querySelector(".add-book");
const bookList = document.querySelector(".ul-list");
const form = document.querySelector(".form-div");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const numberOfPagesInput = document.querySelector("#number-of-pages");
const checkbox = document.querySelector(".checkbox");
const exitBtn = document.querySelector(".exit");
const editForm = document.querySelector(".edit-form-div");
const editTitleInput = document.querySelector("#edit-title");
const editAuthorInput = document.querySelector("#edit-author");
const editNumberOfPagesInput = document.querySelector("#edit-number-of-pages");
const editCheckbox = document.querySelector(".edit-checkbox");
const editExit = document.querySelector(".edit-exit");
const heading = document.querySelector(".heading-button");
const overlay = document.querySelector(".overlay");

// kad stisnem enter na formi, ne ide u novi input nego submit
// finish update i trazenje knjige
// jel mora bit visibility hidden na formi kad maknem?
// bookId sam spremio u edit form titel, jesam li mogao bilo gdje?



class Book {
  constructor(title, author, numberOfPages, isRead) {
    this.id = self.crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
  }

  readBook() {
    this.isRead = !this.isRead;
  }
}

class BookManager {
  books;
  constructor() {
    this.books = []
  }

  addBook(book) {
    this.books.push(book);
  }

  deleteBook(bookId) {
    this.books = this.books.filter(book => book.id !== bookId)
  }

  findBook(bookId) {
    const book = this.books.find(book => book.id === bookId)
    return book;
  }

  startUpdate(bookId) {
    const updatedBook = this.books.find(book => book.id === bookId);
    editTitleInput.value = updatedBook.title;
    // moram spremit bookId

    editTitleInput.setAttribute("data-id", bookId)
    editAuthorInput.value = updatedBook.author;
    editNumberOfPagesInput.value = updatedBook.numberOfPages;
    editCheckbox.checked = updatedBook.isRead;
  }
  
  finishUpdate(bookId) {
    const updatedBook = this.books.find(book => book.id === bookId);
    updatedBook.title = editTitleInput.value;
    updatedBook.author = editAuthorInput.value;
    updatedBook.numberOfPages = editNumberOfPagesInput.value;
    updatedBook.isRead = editCheckbox.checked;
  }

  renderBooks() {
    this.books.forEach(book => {
      const html = `<li class="list-item" data-id="${book.id}">
                      <h3>${book.title}</h3>
                      <p>${book.author}</p>
                      <p>${book.numberOfPages}</p>
                      <div class="buttons-div">
                        <button class="btn" value="read">${book.isRead ? "Read" : "Not read"}</button>
                        <button class="update-btn btn" value="update">Edit</button>
                        <button class="delete-btn btn" value="delete">Delete</button>
                      </div>
                    </li>`;
      bookList.insertAdjacentHTML("afterbegin", html);
    })
  }
}

function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    numberOfPagesInput.value = "";
    checkbox.checked = false;
}

function clearEditForm() {
  editTitleInput.value = "";
  editAuthorInput.value = "";
  editNumberOfPagesInput.value = "";
  editCheckbox.checked = false;
}

function hideForm() {
  form.style.transform = "translate(-1000px)";
  form.classList.add("hidden");
  clearForm()
  overlay.classList.add("hidden")
}

function hideEditForm() {
  editForm.style.transform = "translate(-1000px)"
  // jel mora bit visibility hidden???
  editForm.classList.add("hidden")
  clearEditForm()
  overlay.classList.add("hidden")
}

function showForm() {
  form.classList.remove("hidden");
  form.style.transform = "translateX(600px)";
  overlay.classList.remove("hidden");
}

function showEditForm() {
  editForm.classList.remove("hidden");
  editForm.style.transform = "translateX(600px)";
  overlay.classList.remove("hidden");
}

const bookManager = new BookManager();

addBookBtn.addEventListener("click", () => {
  showForm()
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (titleInput.value !== "" && authorInput.value !== "" && numberOfPagesInput.value !== "") {
    const book = new Book(titleInput.value, authorInput.value, numberOfPagesInput.value, checkbox.checked);
    bookManager.addBook(book);
    bookList.innerHTML = "";
    bookManager.renderBooks();
    hideForm()
    if (bookList !== "") heading.style.paddingTop = "20px"
  }
  
  
})

exitBtn.addEventListener("click", () => {
  hideForm()
})

bookList.addEventListener("click", (event) => {
  if (event.target.value === "delete") {
    const bookId = event.target.closest(".list-item").getAttribute("data-id");
    bookManager.deleteBook(bookId);
    bookList.innerHTML = "";
    bookManager.renderBooks();
  }
      
  if (event.target.value === "update") {
    editForm.classList.remove("hidden");
    const idToUpdate = event.target.closest(".list-item").getAttribute("data-id");
    bookManager.startUpdate(idToUpdate);
    showEditForm()
  }

  if (event.target.value === "read") {
    const bookId = event.target.closest(".list-item").getAttribute("data-id");
    const book = bookManager.findBook(bookId);
    book.readBook()
    bookList.innerHTML = ""
    bookManager.renderBooks()
  }
})

editForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (editAuthorInput !== "" && editTitleInput !== "" && editNumberOfPagesInput !== "") {
    bookManager.finishUpdate(editTitleInput.getAttribute("data-id"))
    bookList.innerHTML = "";
    bookManager.renderBooks();
    hideEditForm()
  }
})

editExit.addEventListener("click", (event) => {
  hideEditForm()
})

overlay.addEventListener("click", () => {
  clearEditForm()
  hideEditForm()
  clearForm()
  hideForm()
})