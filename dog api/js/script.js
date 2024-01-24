// Function to fetch all dog breeds from Dog API
function getAllDogBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      displayDogBreeds(data.message);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to display dog breeds on the webpage
function displayDogBreeds(breeds) {
  const breedList = document.getElementById('breedList');
  breedList.innerHTML = ''; // Clear any existing content

  for (const breed in breeds) {
    const listItem = document.createElement('li');
    listItem.classList.add('breedItem');
    listItem.textContent = breed;

    if (breeds[breed].length > 0) {
      const subBreedList = document.createElement('ul');
      subBreedList.classList.add('subBreeds');
      subBreedList.style.display = 'none';

      breeds[breed].forEach(subBreed => {
        const subBreedItem = document.createElement('li');
        subBreedItem.textContent = subBreed;
        subBreedList.appendChild(subBreedItem);
      });

      listItem.addEventListener('click', function () {
        const selected = document.querySelector('.selected');
        if (selected) {
          selected.classList.remove('selected');
        }
        this.classList.add('selected');
        toggleSubBreeds(subBreedList);
      });

      listItem.appendChild(subBreedList);
    } else {
      listItem.addEventListener('click', function () {
        const selected = document.querySelector('.selected');
        if (selected) {
          selected.classList.remove('selected');
        }
        this.classList.add('selected');
        // For breeds without sub-breeds, you can handle them here.
        // For now, let's fetch and display images for the selected breed.
        handleBreedItemClick(breed);
      });
    }

    breedList.appendChild(listItem);
  }

  // Automatically trigger click event on the first breed item
  const firstBreedItem = breedList.querySelector('.breedItem');
  if (firstBreedItem) {
    firstBreedItem.click();
  }
}

// Function to toggle sub-breeds visibility
function toggleSubBreeds(subBreedList) {
  subBreedList.style.display = subBreedList.style.display === 'none' ? 'block' : 'none';
}

// Function to handle breed or sub-breed item click
function handleBreedItemClick(breed, subBreed = null) {
  const selectedBreed = subBreed ? `${breed}/${subBreed}` : breed;
  getDogBreedImages(selectedBreed)
    .then(images => displayDogBreedImages(images))
    .catch(error => {
      console.error('Error handling breed/sub-breed item click:', error);
    });
}
const breedList = document.getElementById('breedList');
breedList.addEventListener('click', function (event) {
  const breedItem = event.target.closest('.breedItem');
  if (breedItem) {
    const breed = breedItem.textContent;
    handleBreedItemClick(breed);
  }
});

// Attach click event to each sub-breed item
const subBreedList = document.getElementById('breedList');
subBreedList.addEventListener('click', function (event) {
  const subBreedItem = event.target.closest('.subBreeds li');
  if (subBreedItem) {
    const breedItem = subBreedItem.closest('.breedItem');
    const breed = breedItem.textContent;
    const subBreed = subBreedItem.textContent;
    handleBreedItemClick(breed, subBreed);
  }
});

// Function to fetch random images of a specific dog breed from Dog API
function getDogBreedImages(breed, count = 3) {
  const apiUrl = `https://dog.ceo/api/breed/${breed}/images/random/${count}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.message)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error; // Propagate the error for better debugging
    });
}

// Function to display images of a dog breed
function displayDogBreedImages(images) {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = ''; // Clear any existing content

  images.forEach(imageUrl => {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = 'Dog Image';
    imageContainer.appendChild(imageElement);
  });
}

// Automatically fetch and display dog breeds when the page loads
document.addEventListener('DOMContentLoaded', getAllDogBreeds);

// Attach click event to each sub-breed item
document.addEventListener('click', function (event) {
  const subBreedItem = event.target.closest('.subBreeds li');
  if (subBreedItem) {
    const breedItem = subBreedItem.closest('.breedItem');
    const breed = breedItem.textContent;
    const subBreed = subBreedItem.textContent;
    handleBreedItemClick(breed, subBreed);
  }
});
