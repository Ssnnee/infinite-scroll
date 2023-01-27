const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready=false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray =[];
//Unsplash API
const count = 10;
const apiKey ='API_Key';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all immages were loaded

function imageLoaded(){
    console.log('image load');
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true;
        console.log('ready', ready);
    }
}
// Function to set Attributes on DOM
 function setAttributes(element, attributes){
    for(const key in attributes ){
        element.setAttribute(key, attributes[key]);
    }
 }

// Create Elements For Links and Photos, Add to the dom
function displayPhotos(){
        imagesLoaded = 0;
        totalImages = photoArray.length;
        console.log('total images', totalImages);
    // Run function for each obejct in photoArray
        photoArray.forEach((photo)=>{
        // Create <a> to link Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular); 
        // item.setAttribute('alt', photo.alt_description);
        // item.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


 
// Get Photos from API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    };
})



// On load
getPhotos();
