const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


//Unsplash API
let count;
const apiKey = 'eg2p8VTd8-GHVKQ1O98opbLRwnyqMGNZC8Ah_-K6gHM';
let apiURL;

//Check if all images were loaded
function imageLoaded(){
	imagesLoaded++;
	if(imagesLoaded === totalImages){
		ready = true;
		imagesLoaded = 0;
		loader.hidden = true;
		count = 30;
		apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
	}
}

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}


//Create Elements from Links & Photos, Add to DOM
function displayPhotos(){
	totalImages = photosArray.length;
	//Run function for each object in PhotosArray
	photosArray.forEach((photo) => {
		//Create <a> to link to Unsplash
		const item  = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		})
		//Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		})
		//Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);

		//Put <img> inside <a>, then put both inside imageContainer
		item.appendChild(img);
		imageContainer.appendChild(item);
	})
}

//Get photos from Unsplash API
async function getPhotos() {
	try{
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();
	}catch (error){
		console.log(error);
	}
}






//initialLoad();
async function initialLoad() {
	count = 5;
	apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
	try{
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();
	}catch (error){
		console.log(error);
	}
}

initialLoad();

//Check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
		ready = false;
		getPhotos();
	}
})
