/*
Use fetch to get image URL list
https://api.unsplash.com/photos/random?count=12&client_id= access_key;

filter out image URLs into array and make requests for them and display it.
Make a function that returns a promise with success/error
Make another function to display grid items
if success add a grid item to the gallery else do nothing.
*/

//Returns a promise - returns a promise with response json
const convertResponseToJson = (response) => {
  return response.json();
};
//Handles errorResponse and throws a error
const handleErrorResponse = (response) => {
  if (!response.ok) {
    convertResponseToJson(response)
      .then((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }
  return response;
};

//handles success response and calls preloadImages
const handleSuccessResponse = (response) => {
  return convertResponseToJson(response).then((json) => {
    let photos = json.map((photo) => {
      return {
        imgUrl: photo.urls.raw + `&fm=webp&cs=tinysrgb&w=400&fit=max`,
        userName: photo.user.name,
        userProfile: photo.user.links.html,
      };
    });
    return preloadImages(photos);
  });
};

// returns array of photourls
// todo : return a array of object with link to user html page and
// photo URL.
const preloadImages = (photos) => {
  photos.forEach((photo) => {
    const img = new Image();
    img.src = photo.imgUrl;
  });
  return photos;
};
//Creates grid items with background photos
//Note : Add a child div for each grid item with attribution
const createGridItems = (photos) => {
  const GRID_CONTAINER = document.querySelector(".grid-container");
  photos.forEach((photo) => {
    const gridElem = document.createElement("div");
    gridElem.classList.add("grid-item");
    gridElem.style.backgroundImage = `url(${photo.imgUrl})`;
    const attributionElem = document.createElement("div");
    attributionElem.classList.add("attribution");
    const attributionStr = `Photo by <a href="${photo.userProfile}" target="_blank" rel="noreferrer noopener">${photo.userName}</a></span> on <a href="https://unsplash.com/" target="_blank" rel="noreferrer noopener">Unsplash</a> `;
    attributionElem.insertAdjacentHTML("beforeend", attributionStr);
    gridElem.appendChild(attributionElem);
    GRID_CONTAINER.appendChild(gridElem);
  });
};
//Function to kickstart app - make a request , handle response and create grid items
function initApp() {
  fetch(`https://api.unsplash.com/photos/random?count=30&client_id=${atob(
    "YTg5YTc2Yzk4ZWNmNmI5OWRhMzlmYTJiMDM0MmE3ODA0MWE5ZDU1ODk3N2MyMjQ0MmNhMTZkYjAzNTE0NzhhNA=="
  )}
    `)
    .then((res) => handleErrorResponse(res))
    .then((res) => handleSuccessResponse(res))
    .then((smallphotoUrls) => {
      createGridItems(smallphotoUrls);
    })
    .catch((err) => console.log(err));
}

let domResolve;
let domReady = new Promise(function (resolve) {
  // expose state of promise to outer scope variable
  domResolve = resolve;
});

//resolve the promise on DOMContentLoaded event
window.addEventListener("DOMContentLoaded", domResolve);
//initialize the DOM
domReady.then(initApp);
