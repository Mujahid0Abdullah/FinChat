
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




//Post eklendi//

document.getElementById('postForm').addEventListener('submit', function (event) {

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







//KULLANCI BİLGİLERİ GETİRMEK//
async function displayUserInfo() {
    try {
        const response = await fetch(`${url}users`);
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


//DÖVİZ GETİRMEK//
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

getExchangeRates();


//UPDATE USER //

document.getElementById('update-user-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('firstnameLastname').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    if (password == repeatPassword || name == null) {
        try {
            const response = await fetch('https://fin-chat.onrender.com/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
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
});


//İMG GÖSTERMEK
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
