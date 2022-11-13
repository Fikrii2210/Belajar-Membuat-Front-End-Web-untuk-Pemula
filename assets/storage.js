const STORAGE_KEY = "BOOK_APPS";
var books = [];

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id, title, author, year, isCompleted
  }
}

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
    }
    
    function updateDataToStorage() {
        if (isStorageExist()) saveData();
      }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const bookIsCompleted = document.getElementById('inputBookIsComplete').checked;
  
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, bookIsCompleted);
    books.push(bookObject);
  
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  function editBook(bookId) {
    const bookTarget = findBook(Number(bookId));
    if (bookTarget == null) return;
  
    const editTitle = document.getElementById('editBookTitle').value;
    const editAuthor = document.getElementById('editBookAuthor').value;
    const editYear = document.getElementById('editBookYear').value;
    const isCompleted = document.getElementById('editBookIsComplete').checked;
  
    bookTarget.title = editTitle;
    bookTarget.author = editAuthor;
    bookTarget.year = editYear;
    bookTarget.isCompleted = isCompleted;
  
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  const search = document.getElementById("searchBook");
  search.addEventListener("keyup",searchBook);
  function searchBook(element) {
      const cari = element.target.value.toLowerCase();
      let itemList = document.querySelectorAll(".book_item");
      itemList.forEach((item) => {
          const isi = item.firstChild.textContent.toLowerCase();
          if(isi.indexOf(cari) != -1) {
              item.setAttribute("style", "display: block;");
          } else {
              item.setAttribute("style", "display: none !important;");
          }
      });    
  }
  
  function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }
  
  function finishedRead(bookId) {
    const bookTarget = findBook(bookId);
  
    if (bookTarget == null) return;
  
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  function unfinishedRead(bookId) {
    const bookTarget = findBook(bookId);
  
    if (bookTarget == null) return;
  
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
  
  function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
    return -1;
  }
  
  function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);
  
    if (bookTarget === -1) return;
  
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }