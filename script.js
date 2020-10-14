const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'lKMCOVQ-IUgjKSK1_Bwhl9hK1LNJ5zI8Z0wHD7-ril0';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded () {   
    imagesLoaded++; 

    if (imagesLoaded===totalImages) {
        ready = true;
        loader.hidden=true;
    }
}

// Create Elements for Likns and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded=0;
    totalImages=photosArray.length;
    // Run Function for Each Object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to Link to Unsplash 
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Creat Img for Photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description)
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both in imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);    
    });
}

// Get photos from splash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
     } catch(error) {
       }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// load
getPhotos();