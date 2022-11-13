const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved_book';

function saveBook (bookObject) {
  const bookTitle = document.createElement('h3');
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = 'Penulis : ' + bookObject.author;

  const bookYear = document.createElement('p');
  bookYear.innerText = 'Tahun : ' + bookObject.year;
  
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('action');

  if (bookObject.isCompleted) {
    const greenButton = document.createElement('button');
    greenButton.classList.add('green');
    greenButton.innerText = 'Belum Selesai Dibaca';

    greenButton.addEventListener('click', function () {
      unfinishedRead(bookObject.id);
    });
    

    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.innerText = 'Hapus Buku';

    redButton.addEventListener('click', function () {
      deleteBook(bookObject.id);
    });

    buttonContainer.append(greenButton, redButton);

  } else {
    const greenButton = document.createElement('button');
    greenButton.classList.add('green');
    greenButton.innerText = 'Selesai Dibaca';

    greenButton.addEventListener('click', function () {
      finishedRead(bookObject.id);
    })

    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.innerText = 'Hapus Buku';

    redButton.addEventListener('click', function () {
      deleteBook(bookObject.id);
    });

    buttonContainer.append(greenButton, redButton);
  }

  const editButton = document.createElement('button');
 /* editButton.classList.add('blue');
  editButton.innerText = 'Edit Buku';*/

  editButton.addEventListener('click', function () {
    const editForm = document.getElementById('editBook');
    const bookId = this.closest('.book_item').id;
    const bookTarget = findBook(Number(bookId));

    const bookTitle = document.getElementById('editBookTitle');
    const bookAuthor = document.getElementById('editBookAuthor');
    const bookYear = document.getElementById('editBookYear');
    const bookIsCompleted = document.getElementById('editBookIsComplete');
    const bookSubmit = document.getElementById('bookSubmit');

    bookId == bookTarget.id;
    bookTitle.value = bookTarget.title;
    bookAuthor.value = bookTarget.author;
    bookYear.value = bookTarget.year;
    bookIsCompleted.checked = bookTarget.isCompleted;

    editForm.addEventListener('submit', function (event) {
      event.preventDefault();
      editBook(bookId);
      editForm.reset();
      bookTitle.setAttribute('disabled', 'disabled');
      bookAuthor.setAttribute('disabled', 'disabled');
      bookYear.setAttribute('disabled', 'disabled');
      bookIsCompleted.setAttribute('disabled', 'disabled');
      bookSubmit.setAttribute('disabled', 'disabled');
    })

    bookTitle.removeAttribute('disabled')
    bookAuthor.removeAttribute('disabled');
    bookYear.removeAttribute('disabled');
    bookIsCompleted.removeAttribute('disabled');
    bookSubmit.removeAttribute('disabled');
  })

  buttonContainer.append(editButton);

  const container = document.createElement('article');
  container.classList.add('book_item');
  container.append(bookTitle, bookAuthor, bookYear, buttonContainer);

  container.setAttribute('id', `${bookObject.id}`);

  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  const incompletedBooks = document.getElementById('incompleteBookshelfList');
  incompletedBooks.innerHTML = '';

  const completedBooks = document.getElementById('completeBookshelfList');
  completedBooks.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = saveBook(bookItem);

    if (bookItem.isCompleted) {
      completedBooks.append(bookElement);
    } else {
      incompletedBooks.append(bookElement);
    }
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    const searchForm = document.getElementById('searchBook')
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
      submitForm.reset();
    });
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // searchBook();
    });
  
    if (isStorageExist()) {
      loadDataFromStorage();
    }
  });
  