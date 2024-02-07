document.addEventListener("DOMContentLoaded", function () {
  showBooks();
});

function showBooks() {
  const unfinishedList = document.getElementById("unfinished-list");
  const finishedList = document.getElementById("finished-list");

  const books = JSON.parse(localStorage.getItem("books")) || [];

  unfinishedList.innerHTML = "";
  finishedList.innerHTML = "";

  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${book.title} - ${book.author} (${book.year})</span>
      <div>
        <button onclick="moveBook(${book.id}, ${!book.isComplete})">${
      book.isComplete ? "Belum Selesai" : "Selesai"
    }</button>
        <button onclick="editBook(${book.id})">Edit</button>
        <button class="button-hapus" onclick="deleteBook(${
          book.id
        })">Hapus</button>
      </div>
    `;

    if (book.isComplete) {
      finishedList.appendChild(li);
    } else {
      unfinishedList.appendChild(li);
    }
  });
}

function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const isCompleteCheckbox = document.getElementById("isComplete");

  const title = titleInput.value;
  const author = authorInput.value;
  const year = parseInt(yearInput.value);
  const isComplete = isCompleteCheckbox.checked;
  const id = +new Date();

  if (title && author && year) {
    const newBook = {
      id,
      title,
      author,
      year,
      isComplete,
    };

    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    isCompleteCheckbox.checked = false;

    showBooks();
  } else {
    alert("Mohon lengkapi semua field!");
  }
}

function moveBook(id, isComplete) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index].isComplete = isComplete;
    localStorage.setItem("books", JSON.stringify(books));
    showBooks();
  }
}

function deleteBook(id) {
  const confirmation = confirm("Apakah Anda yakin ingin menghapus buku ini?");
  if (confirmation) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
    showBooks();
  }
}

function editBook(id) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    const editedBook = books[index];
    const newTitle = prompt("Masukkan judul buku baru:", editedBook.title);
    const newAuthor = prompt("Masukkan penulis buku baru:", editedBook.author);
    const newYear = prompt("Masukkan tahun terbit buku baru:", editedBook.year);

    if (newTitle && newAuthor && newYear) {
      editedBook.title = newTitle;
      editedBook.author = newAuthor;
      editedBook.year = parseInt(newYear);

      books[index] = editedBook;
      localStorage.setItem("books", JSON.stringify(books));
      showBooks();
    } else {
      alert("Mohon lengkapi semua field!");
    }
  }
}

function searchBooks() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput)
  );
  showFilteredBooks(filteredBooks);
}

function showFilteredBooks(filteredBooks) {
  const searchResultsList = document.getElementById("search-results-list");
  searchResultsList.innerHTML = "";
  filteredBooks.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${book.title} - ${book.author} (${book.year})</span>
    `;
    searchResultsList.appendChild(li);
  });
}
