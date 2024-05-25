import './style.css'

const addBookBtn = document.querySelector(".add-book");

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



}