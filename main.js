import './style.css'

const addBookBtn = document.querySelector(".add-book");
const bookList = document.querySelector(".ul-list");
const form = document.querySelector(".form-div");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const numberOfPagesInput = document.querySelector("#number-of-pages");
const deleteBtn = document.querySelector(".delete-btn");
const updateBtn = document.querySelector(".update-btn");
const buttonsDiv = document.querySelector(".buttons-div");
const checkbox = document.querySelector(".checkbox");
const exitBtn = document.querySelector(".exit");


// kako stavit iks za izac iz forme?

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

  // finish edit funkcija
  // edit forma
  // submit event na tu formu
  // ispraznit formu na submit
  // stavvit x
  startUpdate(bookId) {
    const updatedBook = this.books.find(book => book.id === bookId);
    titleInput.value = updatedBook.title;
    authorInput.value = updatedBook.author;
    numberOfPagesInput.value = updatedBook.numberOfPages
  }

  // finishUpdate()


  renderBooks() {
    this.books.forEach(book => {
      const html = `<li class="list-item" data-id="${book.id}">
                      <h3>${book.title}</h3>
                      <p>${book.author}</p>
                      <p>${book.numberOfPages}</p>
                      <div class="buttons-div">
                        <button value="read">${book.isRead ? "Finished reading!" : "Didn't read!"}</button>
                        <button class="update-btn" value="update">Update Book</button>
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
  form.style.position = "absolute";
  form.style.transform = "translateX(-150%)";
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
  }
})

exitBtn.addEventListener("click", () => {
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
    form.classList.remove("hidden");
    const idToUpdate = event.target.closest(".list-item").getAttribute("data-id");
    bookManager.startUpdate(idToUpdate);
  }

  console.log(event.target.value)
})