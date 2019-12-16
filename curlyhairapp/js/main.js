"use strict";
// =========== Single Page Application functionality =========== //

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "test";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();



// =========== Product SPA functionality =========== //

let products = [];

// fetch all products from WP
function getproducts() {
  fetch('http://curlyhairapp.christinab.dk/wp-json/wp/v2/posts?_embed')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      appendProducts(json);
      products = json;
      setTimeout(function() {
        showLoader(false);
      }, 200);
    });
}

getProducts();

// append movies to the DOM
function appendProducts(products) {
  let htmlTemplate = "";

  for (let product of products) {
    htmlTemplate += `
       <article>
         <h2>${product.title.rendered}</h2>
         <img src="${product.acf.img}">
         <p>${product.acf.indeholder}</p>
         <p>${product.acf.beskrivelse}</p>
         <p>${product.acf.ingrediensliste}</p>
         <p>${product.acf.andet}</p>

       </article>
     `;
  }

  document.querySelector('#products-container').innerHTML = htmlTemplate;
}

// search functionality
function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredProducts = [];
  for (let product of products) {
    let title = product.title.rendered.toLowerCase();
    if (title.includes(searchQuery)) {
      filteredProducts.push(movie);
    }
  }
  console.log(filteredProducts);
  appendProducts(filteredProduct);
}

// fetch all genres / categories from WP
function getGenres() {
  fetch('http://curlyhairapp.christinab.dk/wp-json/wp/v2/categories')
    .then(function(response) {
      return response.json();
    })
    .then(function(categories) {
      console.log(categories);
      appendGenres(categories);
    });
}

getGenres();

// append all genres as select options (dropdown)
function appendGenres(genres) {
  let htmlTemplate = "";
  for (let genre of genres) {
    htmlTemplate += `
      <option value="${genre.id}">${genre.name}</option>
    `;
  }

  document.querySelector('#select-genre').innerHTML += htmlTemplate;
}

// genre selected event - fetch movies by selected category
function genreSelected(genreId) {
  console.log(`Genre ID: ${genreId}`);
  if (genreId) {
    showLoader(true);
    fetch(`http://curlyhairapp.christinab.dk/wp-json/wp/v2/posts?_embed&categories=${genreId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(products) {
        console.log(products);
        appendProductsByGenre(products);
        showLoader(false);
      });
  } else {
    // create feedback
  }
}

// append products by genre
function appendProductsByGenre(productsByGenre) {
  let htmlTemplate = "";

  for (let product of productsByGenre) {
    htmlTemplate += `
      <article>
        <h2>${product.title.rendered}</h2>
        <img src="${product.acf.img}">
        <p>${product.acf.description}</p>
        <iframe src="${product.acf.trailer}"></iframe>
      </article>
    `;
  }

  // if no movies, display feedback to the user
  if (productsByGenre.length === 0) {
    htmlTemplate = `
      <p>Der er inge produkter i denne kategori</p>
    `;
  }

  document.querySelector('#products-by-genre-container').innerHTML = htmlTemplate;
}
