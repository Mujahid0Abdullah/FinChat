var closePopupTimeout;

function togglePopup(event) {
    event.stopPropagation();
    var popup = document.getElementById("popup");
    popup.style.display = popup.style.display === "none" ? "block" : "none";
}

function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup(event) {
    if (event) {
        event.stopPropagation();
    }
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function openDynamicPopup() {
    console.log("Opening dynamic popup");
    var dynamicPopup = document.getElementById("dynamic-popup");
    dynamicPopup.style.display = "block";
}


function closeDynamicPopup() {
    var dynamicPopup = document.getElementById("dynamic-popup");
    dynamicPopup.style.display = "none";
}

function openProfilePage() {
    window.location.href = "profile.html";
}

function cancelClosePopup() {
    clearTimeout(closePopupTimeout);
}

function closePopupWithDelay() {
    closePopupTimeout = setTimeout(function () {
        var popup = document.getElementById("popup");
        popup.style.display = "none";
    }, 100); // 1 saniye gecikme
}

const url = "https://fin-chat.onrender.com/"
fetchPosts()


function fetchPosts() {

    fetch(`${url}posts`) // Sunucu tarafında '/posts' endpoint'i bekliyorsa
        .then(response => response.json())
        .then(posts => {
            // Sunucudan gelen verileri işleme
            console.log(posts);
            const postsListContainer = document.getElementById('postsList');

            posts.forEach(post => {

                let postContent = `
            
    <div class="post-view" >
        <div class="left-column">
            <div class="user-avatar-big">
                <img src="${post.profilePic}">
            </div>
            <div class="user-name">${post.name}</div>
        </div>
        <div class="right-column">
            <div class="upper-row">
                <textarea readonly style="font-weight: bold; font-size: 16px;">${post.desc}</textarea>
             </div>

            <div class="lower-row">
                <div style="font-weight: normal; font-size: 12px;" readonly>  ${moment(post.createdAt).fromNow()} </div>
              <button onclick="postClicked(${post.id})" id="commentsButton">
                  <img src="https://raw.githubusercontent.com/Mujahid0Abdullah/FinChat/main/views/comment.png" alt="Button Image">
              </button>
            </div>
        </div>
    </div>
        `;

                postsListContainer.innerHTML += postContent

            })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        })
}


function openProfilePage() {
    window.location = `${url}profile`
}


function postClicked(postId) {
    // alert(postId)
    window.location = `${url}post?postId=${postId}`
}

/*
        function fetchPosts() {

            fetch(`${url}posts`) // Sunucu tarafında '/posts' endpoint'i bekliyorsa
                .then(response => response.json())
                .then(posts => {
                    // Sunucudan gelen verileri işleme
                    console.log(posts);
                    const postsListContainer = document.getElementById('postsList');

                    posts.forEach(post => {
                        const postDiv = document.createElement('div');
                        postDiv.classList.add('post');

                        const postId = document.createElement('p');
                        postId.textContent = `user:  ${post.name}`;

                        const postDesc = document.createElement('p');
                        postDesc.textContent = `Description: ${post.desc}`;

                        const postCreatedAt = document.createElement('p');
                        postCreatedAt.textContent = `Created At: ${moment(post.createdAt).fromNow()}`;

                        const postImage = document.createElement('img');
                        postImage.src = post.img; // Resim URL
                        postImage.alt = 'Post Image';

                        const hr = document.createElement('hr');
                        postDiv.appendChild(postId);
                        postDiv.appendChild(postDesc);
                        postDiv.appendChild(postCreatedAt);
                        postDiv.appendChild(postImage);
                        postDiv.appendChild(hr);

                        postsListContainer.appendChild(postDiv);

                    })
                        .catch(error => {
                            console.error('Error fetching posts:', error);
                        });
                })
        }
        */
//LOGOUT
function logoutUser() {
    fetch(`${url}auths/logout`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Logout failed');
        })
        .then(data => {
            console.log(data);

            window.location.href = `${url}`;
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
}

document.getElementById('postForm').addEventListener('submit', function (event) {
    //event.preventDefault(); // Form submitini engelle

    const desc = document.getElementById('desc').value;


    // Post verilerini obje olarak oluştur
    const postData = {
        desc: desc,

    };

    // POST isteği göndermek için fetch kullanımı
    fetch(`${url}posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post eklendi:', data);
            fetchPosts();
            // İsteğin başarılı olduğu durumda, istediğiniz işlemleri burada gerçekleştirin
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});
function openImageView() {
    var fileInput = document.createElement("input");
    fileInput.type = "file";

    fileInput.addEventListener("change", function () {
        var selectedFile = fileInput.files[0];
        if (selectedFile) {
            var imageViewer = document.getElementById("imageViewer");
            imageViewer.innerHTML = '<img src="' + URL.createObjectURL(selectedFile) + '" alt="Uploaded Image">';
        }
    });

    fileInput.click();
}

async function displayUserInfo() {
    try {
        const response = await fetch('/users');
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        const userInfo = await response.json();

        const userInfoDiv = document.getElementById('userInfo2');
        const user_Info_post = document.getElementById('input-post-name');
        user_Info_post.value = userInfo.name;

        user_Info_post.innerHTML = `               
  <p> ${userInfo.name}</p>          
`;
        userInfoDiv.innerHTML = `               
<div style="text-align: center;">
<p style="font-weight: bold;">${userInfo.name}</p>
</div>        `;
    } catch (error) {
        console.error('Error:', error);
    }
}

displayUserInfo()
function getExchangeRates() {
    const apiKey = '1bcf3f77aed6bcf6430e283f';
    const baseCurrency = 'USD';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dollarToTRY = document.getElementById('dolar-try');
            const usdToTRY = data.conversion_rates.TRY;
            dollarToTRY.textContent = `USD to TRY: ${usdToTRY.toFixed(5)}`; // Döviz kuru bilgisini gösterir


            const usdToEUR = data.conversion_rates.EUR;
            const eurToTRY = (1 / usdToEUR) * usdToTRY;
            const euroToTRY = document.getElementById('euro-try');
            //const eurToTRY = data.conversion_rates.EUR;
            euroToTRY.textContent = `EUR to TRY: ${eurToTRY.toFixed(5)}`;

            const gbpToTRY = document.getElementById('sterlin-try');
            const usdToGBP = data.conversion_rates.GBP;
            const gbpToTRYValue = (1 / usdToGBP) * usdToTRY;
            gbpToTRY.textContent = `GBP to TRY: ${gbpToTRYValue.toFixed(5)}`;

            const plnToTRY = document.getElementById('pln-try');
            const usdToPLN = data.conversion_rates.PLN;
            const plnToTRYValue = (1 / usdToPLN) * usdToTRY;
            plnToTRY.textContent = `PLN to TRY: ${plnToTRYValue.toFixed(5)}`;
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

// API'den döviz kuru verilerini almak için fonksiyonu çağıralım
getExchangeRates();
/*
        <div id="dynamic-popup">
        <div id="close-btn" onclick="closeDynamicPopup()">X</div>
        <div class="user-avatar-big" onclick="openProfilePictureInput()">
            <img id="currentProfilePicture" src="path/to/user/avatar.jpg" alt="">
            <div id="editProfilePicture"></div>
        </div>
        <input type="file" id="profilePictureInput" accept="image/*" onchange="handleProfilePictureChange()">
        <br>
        <input type="text" id="firstnameLastname" placeholder="First Name Last Name">
        <br>
        <input type="password" id="password" placeholder="Password">
        <br>
        <input type="password" id="repeatPassword" placeholder="Repeat Password">
        <br>
        <button  id="save-btn" onclick="saveChanges()">Save</button>
    </div>*/




document.getElementById('update-user-form').addEventListener('submit', async function (event) {
    event.preventDefault();


    const name = document.getElementById('firstnameLastname').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;


    const formData = new FormData();
    const fileInput = document.getElementById('profileImage');
    const file = fileInput.files[0]; // İlk dosyayı al

    formData.append('name', name);
    formData.append('password', password);
    formData.append('file', file);



    if (password == repeatPassword || name == null) {

        try {
            const response = await fetch('https://fin-chat.onrender.com/users', {
                method: 'PUT',
                /* headers: {
                     'Content-Type': 'application/json'
                 },*/
                body: formData
                //JSON.stringify({ name, password })
            });

            if (response.ok) {
                alert('bilgileriniz güncellendi');
                location.reload();
                // window.location.href = './home';
            } else {
                const errorMessage = await response.json();
                alert(`Login failed: ${errorMessage}`);
            }

        } catch (error) {
            console.error('Error:', error);
            // Handle error if fetch fails
            alert('An error occurred while processing your request.');
        }



    } else { alert("password aynı değil yada adı boş") }



})
/*
document.getElementById('update-user-form').addEventListener('submit', async function (event) {
    event.preventDefault();


    const img = document.getElementById('img').files[0];
    const name = document.getElementById('firstnameLastname').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('img', img);
    formdata.append('password', password);
    if (password == repeatPassword || name == null) {

        try {
            const response = await fetch('https://fin-chat.onrender.com/users', {
                method: 'PUT',

                body: formdata//JSON.stringify({ name, password })
            });

            if (response.ok) {
                alert('bilgileriniz güncellendi');
                location.reload();
                // window.location.href = './home';
            } else {
                const errorMessage = await response.json();
                alert(`Login failed: ${errorMessage}`);
            }

        } catch (error) {
            console.error('Error:', error);
            // Handle error if fetch fails
            alert('An error occurred while processing your request.');
        }



    } else { alert("password aynı değil yada adı boş") }



});*/

//ADD POST
/*
document.getElementById('postForm').addEventListener('submit', function (event) {

    event.preventDefault(); // Form submitini engelle

    const desc = document.getElementById('desc').value;
    const img = document.getElementById('img').files[0];

    const formdata = new FormData();
    formdata.append('desc', desc);
    formdata.append('img', img);
    // Post verilerini obje olarak oluştur
    const postData = {
        des: desc,
        img: img
    };

    // POST isteği göndermek için fetch kullanımı
    fetch('http://localhost:8800/posts', {
        method: 'POST',
    headers: {
            'Content-Type': 'application/json'
        },
        body: formdata
        //JSON.stringify(postData)
     })
        .then(response => {
            if (!response.ok) {
                throw new Error('hata oldu , yeniden giriş yapın');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post eklendi:', data);
            fetchPosts();
        })
        .catch(error => {

            const message = error.message
            //data.message;
            alert(message);
        });
        });

/*
GetData()
function GetData() {
    fetch("http://localhost:8800/posts", {
        method: "GET"
    }).then(Request => Request.json())
        .then(data => {
            ShowData(data)
        })
}
*/
/*
        function ShowData(data) {
            let Table = `<table class="table">`
            Table += `<tr> 
                            <th>Name</th> 
                            <th>Email</th> 
                            <th>Password</th> 
                            <th style="color:red;">Delete</th>
                            <th style="color:dark;">Update</th>
                         </tr>`
            Users.forEach(User => {
                Table += `<tr> 
                                <td contenteditable id="Name${User.Id}">${User.desc}</td> 
                                <td contenteditable id="Email${User.Id}">${User.userid}</td> 
                                <td contenteditable id="Password${User.Id}">${User.img}</td> 
                                <td onclick="Remove(${User.createdAt})"><button class="btn btn-danger">x</button> </td>
                                <td onclick="Update(${User.Id})"><img src="update.png" width="45"></td>  
                            </tr>`
            });
            Table += ` </table>`
            //document.getElementById("Users").innerHTML = Table
        }
            
        /*
function Create() {
 fetch("http://localhost:8800/auths/login", {
     method: "POST",
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
         username: document.getElementById("username").value,

         password: document.getElementById("password").value
     })
 }).then(Request => Request.json()).then(Answer => {
    
     fetchPosts()
 })
}*/

/*
function addpost() {
    const desc = document.getElementById('desc').value;
    //const img = document.getElementById('img').files[0];
    const formdata = new FormData();
    formdata.append('desc', desc);
    //formdata.append('img', img);
    fetch(`${url}posts`, {
        method: 'POST',
        
        body: formdata
        //JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('hata oldu , yeniden giriş yapın');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post eklendi:', data);
            fetchPosts();
        })
        .catch(error => {

            const message = error.message
            //data.message;
            alert(message);
        });
}*/