class page {
    getpost(userid){}
}


class homePage extends page {
    constructor(){
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
}

class profile extends page {

    constructor(){
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

}

class othersProfile extends page {

    constructor(){
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
        }else if (pageType =="profile"){
            this.profile.getpost(id);
        }else if (pageType =="othersProfile"){
            this.othersprofile.getpost(id);

        }
    }
}

const fcd = new facade();




