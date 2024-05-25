import './style.css'

const addBookBtn = document.querySelector(".add-book");
const bookList = document.querySelector(".ul-list");

class Book {
  constructor(id, title, author, numberOfPages) {
    this.id = id;
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
    this.books.filter(book => book.id !== bookId)
  }

  // updateBook(bookId)
  renderBooks() {
    this.books.forEach(book => {
      const html = `<li class="list-item">
                      <h3>${book.title}</h3>
                      <p>${book.author}</p>
                      <p>${book.numberOfPages}</p>
                      <div>
                        <button>${book.isRead ? "Finished reading!" : "Didn't read!"}</button>
                        <button></button>
                      </div>
                    </li>`;
      bookList.insertAdjacentHTML("afterbegin", html);
    })
  }

}
addBookBtn.addEventListener("click", () => {
  
})