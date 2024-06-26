class page {
    getpost(userid){}
    getUserinfo(userid){}

    updateUser(){

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
    }


    getExchangeRates() {
        console.log('İstek başarılı bir şekilde atıldı');

    // JSON verisini çekelim
    fetch('https://finans.truncgil.com/v3/today.json')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          console.log(data["14-ayar-altin"].Buying)
          console.log(data["22-ayar-bilezik"].Buying)
           document.getElementById('dolar-try').textContent ="USD To TR: "+data["USD"].Buying;
         document.getElementById('euro-try').textContent="EUR To TR: "+data["EUR"].Buying;
            document.getElementById('sterlin-try').textContent="GBP To TR: "+data["GBP"].Buying;
            document.getElementById('pln-try').textContent="PLN To TR : "+data["PLN"].Buying;

          document.getElementById('22altin').textContent="22 Ayar Altın: "+data["22-ayar-bilezik"].Buying;

          document.getElementById('Caltin').textContent="Çeyrek Altın: "+data["ceyrek-altin"].Buying;
          document.getElementById('gumus').textContent="Gümüş: "+data["gumus"].Buying;
          document.getElementById('cumhuriyet-altini').textContent="C. Altını: "+data["cumhuriyet-altini"].Buying;
    

      
        

        // Bir sonraki isteği 10 saniye sonra atalım
        
      })
      .catch(error => console.error('Veri alınamadı:', error));
    }


    gitCurrency() {
    
   

        // CoinGecko API'sinden veri çekme
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,dogecoin&vs_currencies=try')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
        
              console.log(data.bitcoin.try)
            // Kripto paraların fiyatlarını alm
            document.getElementById('bitcoin').textContent= "Bitcoin: "+data.bitcoin.try
            document.getElementById('Ethereum').textContent="Ethereum: "+data.ethereum.try
            document.getElementById('Litecoin').textContent="Litecoin: "+data.litecoin.try
            document.getElementById('Dogecoin').textContent="Dogecoin: "+data.dogecoin.try
           
            // İstek başarılı olduğunda konsola mesaj yazdırma
            console.log('İstek başarıyla yapıldı.');
    
            // İstek sayısını artırma
           
          })
          .catch(error => {
            console.error('API çağrısı sırasında bir hata oluştu:', error);
          });
      }
}


class homePage extends page {
    constructor(){
        super();
        this.url = "https://fin-chat.onrender.com/";
    }

    getpost(id){
        fetch(`${this.url}posts`) // Sunucu tarafında '/posts' endpoint'i bekliyorsa
        .then(response => response.json())
        .then(posts => {
            // Sunucudan gelen verileri işleme
            console.log(posts);
            const postsListContainer = document.getElementById('postsList');
            postsListContainer.innerHTML="";

            posts.forEach(post => {

                let postContent = `
            
    <div class="post-view" >
        <div class="left-column">
            <div class="user-avatar-big" onclick="openHisProfilePage(${post.userId})">
            <div class="user-avatar" style="height: 100%; width: 100%;">
                <img src="https://lh3.googleusercontent.com/d/${post.profilePic}">
            </div>
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

    }

    getUserinfo(userid){
       
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
          }
    
}

class profile extends page {

    constructor(){
        super();
        this.url = "https://fin-chat.onrender.com/";
    }

    getpost(id){
        fetch(`${url}posts/myposts`) // Sunucu tarafında '/posts' endpoint'i bekliyorsa
        .then(response => response.json())
        .then(posts => {
          // Sunucudan gelen verileri işleme
          console.log(posts);
          const postsListContainer = document.getElementById('postsList');
          postsListContainer.innerHTML="";

          posts.forEach(post => {

            let postContent = `
                    
            <div class="post-view" >
                <div class="left-column">
                    <div class="user-avatar-big">
                      <div class="user-avatar" style="height: 100%; width: 100%;">
                        <img src="https://lh3.googleusercontent.com/d/${post.profilePic}">
                      </div>
                    </div>
                    <div class="user-name">${post.name}</div>
                </div>
                <div class="right-column">
                    <div class="upper-row">
                        <textarea readonly style="font-weight: bold; font-size: 16px;">${post.desc}</textarea>
                     </div>

                    <div class="lower-row">
                        <div style="font-weight: normal; font-size: 12px;" readonly>  ${moment(post.createdAt).fromNow()} </div>
                      <button onclick="Deletepost(${post.id})" id="DeleteButton">
                          <img src="https://fin-chat.onrender.com/static/delete.png" alt="Button Image">
                      </button>
                      <button onclick="postClicked(${post.id})"  id="commentsButton">
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
    
    }

    getUserinfo(userid){
      
            fetch(`${url}users?userid=${userid}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(userInfo => {
                console.log(userInfo);
                const userInfoDive = document.getElementById('userInfo222');
                const img= "https://lh3.googleusercontent.com/d/" + userInfo.profilePic
                document.getElementById('user-avatar-big3').src =img;
        
        
                userInfoDive.innerHTML = `               
                <div style="text-align: center;">
            <p style="font-weight: bold;">${userInfo.name}</p>
            <p style="font-weight: bold;">${userInfo.email}</p>
        
        </div>        `;
        
               
              })
              .catch(error => {
                console.error('Error fetching user info:', error);
              });
          }
    
}

class othersProfile extends page {

    constructor(){
        super();
        this.url = "https://fin-chat.onrender.com/";
    }

    getpost(id){
        fetch(`${url}posts/Otherpost?userid=${id}`) // Sunucu tarafında '/posts' endpoint'i bekliyorsa
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
                <div class="user-avatar" style="height: 100%; width: 100%;">
                <img src="https://lh3.googleusercontent.com/d/${post.profilePic}">
            </div>
            </div>
            <div class="user-name">${post.name}</div>
        </div>
        <div class="right-column">
            <div class="upper-row">
                <textarea readonly style="font-weight: bold; font-size: 16px;">${post.desc}</textarea>
             </div>

            <div class="lower-row">
                <div style="font-weight: normal; font-size: 12px;" readonly>  ${moment(post.createdAt).fromNow()} </div>
            
              <button onclick="postClicked(${post.id})"  id="commentsButton">
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
    }


    getUserinfo(userid){
            fetch(`${url}users?userid=${userid}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(userInfo => {
                console.log(userInfo);
                const userInfoDive = document.getElementById('userInfo222');
                        const img= "https://lh3.googleusercontent.com/d/" + userInfo.profilePic
                document.getElementById('user-avatar-big3').src =img;
        
                        userInfoDive.innerHTML = `               
                <div style="text-align: center;">
            <p style="font-weight: bold;">${userInfo.name}</p>
            <p style="font-weight: bold;"> ${userInfo.email}</p>
        </div>        `;
           
        
               
              })
              .catch(error => {
                console.error('Error fetching user info:', error);
              });
          }
    

}



class commentPage extends page {

    constructor(){
        super();
        this.url = "https://fin-chat.onrender.com/";
    }

    getUserinfo(userid){
        
        fetch(`${this.url}users?userid=${userid}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(userInfo => {

                const userInfoDiv = document.getElementById('userInfo');
                const userInfoDiv2 = document.getElementById('userInfo2');
                const img= "https://lh3.googleusercontent.com/d/" + userInfo.profilePic
        document.getElementById('user-avatar-big3').src =img;
        document.getElementById('user-avatar-big4').src =img;



                userInfoDiv.innerHTML = `               
          <p>${userInfo.name}</p>          
        `;

                userInfoDiv2.innerHTML = `               
        <div style="text-align: center;">
    <p style="font-weight: bold;">${userInfo.name}</p>
</div>        `;
    
})
.catch(error => {
  console.error('Error fetching user info:', error);
});
        }
    

}


class facade {
    constructor(){
        this.home = new homePage();
        this.profile = new profile();
        this.othersprofile = new othersProfile();
        this.commentPage= new commentPage();
        this.page = new page() 
    }

    getpost(id, pageType){
        if (pageType =="home"){
            this.home.getpost(id)
        }else if (pageType =="profile"){
            this.profile.getpost(id);
        }else if (pageType =="othersProfile"){
            this.othersprofile.getpost(id);

        }
    }

    getExchangeRates(){
        this.page.getExchangeRates();
        this.page.gitCurrency();
    }

    updateUser(){
        this.page.updateUser();
    }



    getUserinfo(id, pageType){
        if (pageType =="home"){
            this.home.getUserinfo(id)
        }else if (pageType =="profile"){
            this.profile.getUserinfo(id);
        }else if (pageType =="othersProfile"){
            this.othersprofile.getUserinfo(id);
        }else if (pageType =="commentpage"){
            this.commentPage.getUserinfo(id);
    }
}


}

const fcd = new facade();




