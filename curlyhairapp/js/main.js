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
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

// TABS
$(document).ready(function(){
  $('.tabs').tabs();
});


//ingrediensliste collapsible

$(document).ready(function(){
   $('.collapsible').collapsible();
 });




//hent ingrediensliste fra googlesheet

 let sheetId = "10MD_vT-eBDLNCcrAvv0w9rqmiWpW68QE0timKs703ww";
 let sheetNumber = 1;
 let sheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheetNumber}/public/full?alt=json`;
 console.log(sheetUrl);

 fetch(sheetUrl)
   .then(function(response) {
     return response.json();
   })
   .then(function(json) {
     console.log(json);
     appendPersons(json.feed.entry);
   });

 /*
 Appends json data to the DOM
 */
 function appendingrediens(ingrediens) {
   console.log(ingrediens);
   let htmlTemplate = "";
   for (let ingredien of ingrediens) {
     htmlTemplate += `
         <article>
           <h4>${ingrediens['gsx$alkohol']['$t']}</h4>
           <p>${ingrediens['gsx$1']['$t']}">${ingrediens['gsx$1']['$t']}</p>
         </article>
       `;
   }
   document.querySelector("#ingrediens").innerHTML += htmlTemplate;
