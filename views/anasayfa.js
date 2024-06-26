const url = "https://fin-chat.onrender.com/"

fcd.getpost(0,"home");
fcd.getUserinfo(0,"home");


fcd.getExchangeRates()

document.getElementById('update-user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    fcd.updateUser()
})

function openProfilePage() {
    window.location = `${url}profile`
}

function openHisProfilePage(userid) {
    window.location = `${url}OthersProfile?userid=${userid}`
}


function postClicked(postId) {
    // alert(postId)
    window.location = `${url}post?postId=${postId}`
}


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

//SEARCH BAR//

const inputElement = document.getElementById('search'); // Örnek bir input id'si kullanılmıştır, kendi projenizdeki id'ye uygun olarak değiştirin

inputElement.addEventListener('input', function (event) {
    const searchData = {
        name: event.target.value // Input'taki değeri alıp API çağrısı için kullanıyoruz
    };

    fetch(`${url}users/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            // Sunucudan gelen verileri işleme
            console.log(users);
            const postsListContainer = document.getElementById('usersList');
            postsListContainer.innerHTML = "";

            users.forEach(user => {

                let postContent = `
            

                <div class="view-profiles">

                  <div class="left-column-vp">

                    <div class="user-avatar-vp" onclick="openHisProfilePage(${user.id})">
                    <div class="user-avatar" style="height: 100%; width: 100%;">
                      <img src="https://lh3.googleusercontent.com/d/${user.profilePic}">
                      </div>
                    </div>

                  </div>

                  <div class="right-column-vp">
                  ${user.name}
                  </div>
                </div>
        `;

                postsListContainer.innerHTML += postContent

            })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        })
        .catch(error => {
            console.error('Hata oluştu:', error);
            // Hata durumunda gerekli işlemler burada yapılabilir
        });
});

document.getElementById('postForm').addEventListener('submit', function () {

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
            
            
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});


/*
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
            <div class="user-avatar-big" onclick="openHisProfilePage(${post.userId})">
                <img src="https://lh3.googleusercontent.com/d/${post.profilePic}">
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
                  <img src="https://fin-chat.onrender.com/static/comment.png" alt="Button Image">
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
}*/





/*
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engellemek için formun varsayılan davranışını engeller

    facade.post.setpost(); // Olay gerçekleştiğinde setpost() metodu çalışacak
    const desc = document.getElementById('desc').value;
    desc.value="";

});*/








//KULLANCI BİLGİLERİ GETİRMEK//
/*
async function displayUserInfo(userid) {
    try {
        const response = await fetch(`${url}users?userid=${userid}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        const userInfo = await response.json();
        console.log(userInfo);
        const img= "https://lh3.googleusercontent.com/d/" + userInfo.profilePic
        const userInfoDiv = document.getElementById('userInfo2');
        const userimage = document.getElementById('currentProfilePicture');
        const userimage2 = document.getElementById('user-avatar-big');
         document.getElementById('user-avatar-big3').src =img;


        userimage.src = img; // Resim URL
        userimage2.src = img; // Resim URL

        userimage.alt = 'user Image';
        userimage2.alt = 'user Image';

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
}*/


//in facade----------------------------------------
/*
displayUserInfo(0);
function displayUserInfo(userid) {
    fetch(`${url}users?userid=${userid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(userInfo => {
        console.log(userInfo);
        const img= "https://lh3.googleusercontent.com/d/" + userInfo.profilePic
        const userInfoDiv = document.getElementById('userInfo2');
        const userimage = document.getElementById('currentProfilePicture');
        const userimage2 = document.getElementById('user-avatar-big');
         document.getElementById('user-avatar-big3').src =img;


        userimage.src = img; // Resim URL
        userimage2.src = img; // Resim URL

        userimage.alt = 'user Image';
        userimage2.alt = 'user Image';

        const user_Info_post = document.getElementById('input-post-name');
        user_Info_post.value = userInfo.name;

        user_Info_post.innerHTML = `               
  <p> ${userInfo.name}</p>          
`;
        userInfoDiv.innerHTML = `               
<div style="text-align: center;">
<p style="font-weight: bold;">${userInfo.name}</p>
</div>        `;
   

       
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }*/

//---------------------------------------------------------------------
//UPDATE USER //

/*
document.getElementById('update-user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const fileInput = document.getElementById('profileImage');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const name = document.getElementById('firstnameLastname').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    if (password === repeatPassword || name !== null) {
        fetch('https://fin-chat.onrender.com/upload', {
            method: 'POST',
            body: formData,
        })
            .then(resImg => resImg.json())
            .then(data => {
                console.log(data);
                const imgId = data.fileId;
                console.log(imgId);

                return fetch('https://fin-chat.onrender.com/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, password, imgId })
                });
            })
            .then(response => {
                if (response.ok) {
                    alert('bilgileriniz güncellendi');
                    location.reload();
                } else {
                    return response.json().then(errorMessage => {
                        throw new Error(`Login failed: ${errorMessage}`);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while processing your request.');
            });
    } else {
        alert("password aynı değil yada adı boş");
    }
});*/
/*
document.getElementById('update-user-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const fileInput = document.getElementById('profileImage');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const name = document.getElementById('firstnameLastname').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    if (password == repeatPassword || name == null) {
        try {

            const resImg = fetch('https://fin-chat.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });
            const data = resImg.json();
            console.log(data);
            const imgId = data.fileId;
            console.log(imgId)

            const response = await fetch('https://fin-chat.onrender.com/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password, imgId })
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


