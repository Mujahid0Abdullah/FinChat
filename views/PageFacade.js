class page {
    getpost(userid){}
    getUserinfo(userid){}
    getExchangeRates() {
        const apiKey = 'e2d37d6b14c2e615ce74c8d0';
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
                          <img src="https://raw.githubusercontent.com/Mujahid0Abdullah/FinChat/main/views/delete.png" alt="Button Image">
                      </button>
                      <button onclick="postClicked(${post.id})"  id="commentsButton">
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


class facade {
    constructor(){
        this.home = new homePage();
        this.profile = new profile();
        this.othersprofile = new othersProfile();
    }

    getpost(id, pageType){
        if (pageType =="home"){
            this.home.getpost(id)
            this.home.getExchangeRates()
        }else if (pageType =="profile"){
            this.profile.getpost(id);
            this.profile.getExchangeRates()
        }else if (pageType =="othersProfile"){
            this.othersprofile.getpost(id);
            this.othersprofile.getExchangeRates()

        }
    }

    getUserinfo(id, pageType){
        if (pageType =="home"){
            this.home.getUserinfo(id)
        }else if (pageType =="profile"){
            this.profile.getUserinfo(id);
        }else if (pageType =="othersProfile"){
            this.othersprofile.getUserinfo(id);

        }
    }


}

const fcd = new facade();




