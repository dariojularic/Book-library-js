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

// kako stavit iks za izac iz forme?

class Book {
  constructor(title, author, numberOfPages) {
    this.id = self.crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = false;
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

  updateBook(bookId) {
    const updatedBook = this.books.find(book => book.id === bookId);
    titleInput.value = updatedBook.title
    authorInput.value = updatedBook.author
    numberOfPagesInput.value = updatedBook.numberOfPages
  }

  // updateBook(bookId)
  renderBooks() {
    this.books.forEach(book => {
      const html = `<li class="list-item" data-id="${book.id}">
                      <h3>${book.title}</h3>
                      <p>${book.author}</p>
                      <p>${book.numberOfPages}</p>
                      <div class="buttons-div">
                        <button>${book.isRead ? "Finished reading!" : "Didn't read!"}</button>
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
})

form.addEventListener("submit", (event) => {
  event.preventDefault()
  if (titleInput.value !== "" && authorInput.value !== "" && numberOfPagesInput.value !== "") {
    const book = new Book(titleInput.value, authorInput.value, numberOfPagesInput.value);
    bookManager.addBook(book);
    bookList.innerHTML = "";
    bookManager.renderBooks();
    form.classList.add("hidden")
  }
})

bookList.addEventListener("click", (event) => {
  console.log(event.target.closest(".list-item").getAttribute("data-id"))
  if (event.target.value === "update") {
    form.classList.remove("hidden");
    // treba doci do text value
    console.log(form.children)
    console.log("Child Nodes", form.childNodes)
    // ponovo prikazi formu, ali ovaj put sa popunjenim input poljima
  } else if (event.target.value === "delete") {
    const bookId = event.target.closest(".list-item").getAttribute("data-id")
    bookManager.deleteBook(bookId)
    bookList.innerHTML = "";
    bookManager.renderBooks()
  }
})