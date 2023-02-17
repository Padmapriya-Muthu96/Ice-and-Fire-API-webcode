 url= "https://www.anapioficeandfire.com/api/books";

// async function api(){
// A=fetch(url);
// prom=await A;
// A1=prom.json();
// prom1=await A1;
// console.log(prom1);

// }
// api();

const booksContainer = document.querySelector('#books');

async function getBooks(page, pageSize) {
    try {
      const response = await fetch(`https://anapioficeandfire.com/api/books?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch books.');
    }
  }

 async function getCharactersForBook(book) {
  const characterUrls = book.characters.slice(0, 5);
   const characters = [];

  for (const url of characterUrls) {
     try {
       const response = await fetch(url);
       const data = await response.json();
       characters.push(data.name);
    } catch (error) {
       console.error(error);
       characters.push('Unknown');
     }
  }

   return characters.join(', ');
 }

function displayBooks(books) {
  booksContainer.innerHTML = ''; // Clear previous results

  books.forEach(async (book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

     const titleElement = document.createElement('h2');
    titleElement.textContent = book.name;
     bookElement.appendChild(titleElement);

     const isbnElement = document.createElement('p');
    isbnElement.textContent = `ISBN: ${book.isbn}`;
    bookElement.appendChild(isbnElement);

    const pagesElement = document.createElement('p');
     pagesElement.textContent = `Number of pages: ${book.numberOfPages}`;
    bookElement.appendChild(pagesElement);

    const authorsElement = document.createElement('p');
     const authors = book.authors.join(', ');
     authorsElement.textContent = `Authors: ${authors}`;
     bookElement.appendChild(authorsElement);

    const publisherElement = document.createElement('p');
     publisherElement.textContent = `Publisher: ${book.publisher}`;
    bookElement.appendChild(publisherElement);

    const releasedElement = document.createElement('p');
    releasedElement.textContent = `Released: ${book.released}`;
     bookElement.appendChild(releasedElement);

    const charactersElement = document.createElement('p');
     charactersElement.textContent = `Characters: ${await getCharactersForBook(book)}`;
   bookElement.appendChild(charactersElement);

     booksContainer.appendChild(bookElement);
   });
 }

 async function loadBooks() {
     try {
       const books = await getBooks(1, 50);
      displayBooks(books);
    } catch (error) {
      console.error(error);
       booksContainer.textContent = 'Failed to load books.';
     }
  }
  
  loadBooks();