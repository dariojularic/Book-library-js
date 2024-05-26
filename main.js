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

  startUpdate(bookId) {
    const updatedBook = this.books.find(book => book.id === bookId);
    editTitleInput.value = updatedBook.title;
    editTitleInput.setAttribute("data-id", bookId)
    editAuthorInput.value = updatedBook.author;
    editNumberOfPagesInput.value = updatedBook.numberOfPages;
    editCheckbox.checked = updatedBook.isRead;
    // moram spremit bookId
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
                        <button value="read">${book.isRead ? "Finished reading!" : "Didn't read!"}</button>
                        <button class="update-btn" value="update">Edit Book</button>
                        <button class="delete-btn" value="delete">Delete Book</button>
                      </div>
                    </li>`;
      bookList.insertAdjacentHTML("afterbegin", html);
    })
  }
}

const bookManager = new BookManager();

addBookBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  // form.style.position = "absolute";
  form.style.transform = "translateX(50%)";
  form.style.transition = "1s";
})

form.addEventListener("submit", (event) => {
  event.preventDefault()
  if (titleInput.value !== "" && authorInput.value !== "" && numberOfPagesInput.value !== "") {
    const book = new Book(titleInput.value, authorInput.value, numberOfPagesInput.value, checkbox.checked);
    titleInput.value = "";
    authorInput.value = "";
    numberOfPagesInput.value = "";
    checkbox.checked = false;
    bookManager.addBook(book);
    bookList.innerHTML = "";
    bookManager.renderBooks();
    form.classList.add("hidden");
    form.style.transform = "translateX(300%)";
  }
})

exitBtn.addEventListener("click", () => {
  form.style.transform = "translateX(300%)";
  titleInput.value = "";
  authorInput.value = "";
  numberOfPagesInput.value = "";
  checkbox.checked = false;
  form.classList.add("hidden");
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
    editForm.style.transform = "translateX(50%)";
    editForm.style.transition = "1s"
    editForm.classList.remove("hidden");
  }
})

editForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (editAuthorInput !== "" && editTitleInput !== "" && editNumberOfPagesInput !== "") {
    bookManager.finishUpdate(editTitleInput.getAttribute("data-id"))
    editTitleInput.value = "";
    editAuthorInput.value = "";
    editNumberOfPagesInput.value = "";
    editCheckbox.checked = false;
    bookList.innerHTML = "";
    bookManager.renderBooks();
    editForm.style.transform = "translateX(300%)";
    editForm.classList.add("hidden");
  }
})

editExit.addEventListener("click", (event) => {
  event.preventDefault()
  editTitleInput.value = "";
  editAuthorInput.value = "";
  editNumberOfPagesInput.value = "";
  editCheckbox.checked = false;
  editForm.style.transform = "translateX(300%)";
  editForm.classList.add("hidden");
})

