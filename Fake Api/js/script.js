function getAllUser(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data =>{
        displayUser(data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data :', error);
    });
}

function displayUser(users){
    const userdata = document.getElementById('userdata');
    console.log(userdata);
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'col-4 user-box';
        userElement.innerHTML =`<div class="col-12">
                                        <p><strong>Name : </strong>${user.name}</p>
                                        <p><strong>Username : </strong>${user.username}</p>
                                        <p><strong>E-mail : </strong>${user.email}</p>
                                        <p><strong>Phone : </strong>${user.phone}</p>
                                        <button class="user-info-btn" data-bs-toggle="modal" data-bs-target="#userModal" 
                                        onclick="showUserInfo('${user.name}', '${user.username}', '${user.email}', '${user.phone}', '${user.address.street}','${user.address.suite}','${user.address.city}','${user.address.zipcode}','${user.address.geo.lat}','${user.address.geo.lng}','${user.website}','${user.company.name}','${user.company.catchPhrase}','${user.company.bs}','${user.id}')">VIEW</button>
                                </div>`;
        userdata.appendChild(userElement);
    });  
}
function showUserInfo(name, username, email, phone,street,suite,city,zipcode,lat,lng,website,cname,catchPhrase,bs,id) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `<div class="model-u-f">
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Username:</strong> ${username}</p>
                                <p><strong>E-mail:</strong> ${email}</p>
                                <p><strong>Phone:</strong> ${phone}</p>
                                <p><strong>Address:-</strong><br><strong style="margin-left: 50px">Street:</strong> ${street}
                                                            <br><strong style="margin-left: 50px">Suite:</strong> ${suite}
                                                            <br><strong style="margin-left: 50px">City:</strong> ${city}
                                                            <br><strong style="margin-left: 50px">Zipcode:</strong> ${zipcode}
                                                            <br><strong style="margin-left: 50px">Geo:-</strong>
                                                            <br><strong style="margin-left: 80px">Lat:</strong> ${lat}
                                                            <br><strong style="margin-left: 80px">Lag:</strong> ${lng}
                                                            </p>
                                <p><strong>Website:</strong> ${website}</p>
                                <p><strong>Company Name:</strong> ${cname}</p>
                                <p><strong>CatchPhrase:</strong> ${catchPhrase}</p>
                                <p><strong>Bs:</strong> ${bs}</p>
                                <button class="user-info-btn" style="margin:10px 0px 10px 100px" onclick="userAlbums('${id}')" onclick="closeModal()" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">ALBUMS</button>
                                <button class="user-info-btn" style="margin:10px 0px 10px 100px" onclick="userPosts('${id}')">POSTS</button>
                            </div>`;
}

function closeModal() {
    $('#userModal').modal('hide');
}

function userAlbums(userId) {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            displayAlbums(data);
            console.log(data);
        })
        .catch(error => {
            console.log('Error fetching album data:', error);
        });
}

function displayAlbums(userAlbums) {
    const offcanvasBody = document.querySelector('.offcanvas-body'); 
    offcanvasBody.innerHTML = '';
    
    userAlbums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.className = 'albums-user';
        albumDiv.innerHTML = `<p class="clickable-album" data-album-id="${album.id}">${album.title}</p>`;
        offcanvasBody.appendChild(albumDiv);
    });


    const clickableAlbums = document.querySelectorAll('.clickable-album');
    clickableAlbums.forEach(album => {
        album.addEventListener('click', () => showAlbumPhotos(album.getAttribute('data-album-id')));
    });
}

function showAlbumPhotos(albumId) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(response => response.json())
        .then(photos => {
            displayPhotos(photos);
        })
        .catch(error => {
            console.error('Error fetching photo data:', error);
        });
}

function displayPhotos(photos) {
    const photosDiv = document.getElementById('photos');
    photosDiv.innerHTML = '';

    photos.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-user';
        photoDiv.innerHTML = `<div><img src="${photo.thumbnailUrl}" alt="${photo.title}" /></div>`;
        photosDiv.appendChild(photoDiv);
    });
}

function userPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            console.error('Error fetching post data:', error);
        });
}

function displayPosts(posts) {
    const postsOffcanvasBody = document.getElementById('postsOffcanvasBody');
    postsOffcanvasBody.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-user';
        postDiv.innerHTML = `<span class="clickable-post" data-post-id="${post.id}"><h4>${post.title}</h4>
                            <p>${post.body}</p></span>`;
        postsOffcanvasBody.appendChild(postDiv);
    });

    const clickablePosts = document.querySelectorAll('.clickable-post');
    clickablePosts.forEach(post => {
        post.addEventListener('click', () => showPostComments(post.getAttribute('data-post-id')));
    });

    const postsOffcanvas = new bootstrap.Offcanvas(document.getElementById('postsOffcanvas'));
    postsOffcanvas.show();
}



function showPostComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            displayPostComments(comments);
        })
        .catch(error => {
            console.error('Error fetching comments data:', error);
        });
}
function displayPostComments(comments) {
    const commentDiv = document.getElementById('comment');
    commentDiv.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'fun';
        commentElement.innerHTML = `
                                <p><strong>Name:</strong> ${comment.name}</p>
                                <p><strong>Email:</strong> ${comment.email}</p>
                                <p><strong>Comment:</strong> ${comment.body}</p>`;
        commentDiv.appendChild(commentElement);
    });
}


window.addEventListener('load', getAllUser);