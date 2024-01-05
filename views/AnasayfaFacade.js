class post {
    constructor() {
        this.url = "https://fin-chat.onrender.com/"
      }

    setpost () {

        const desc = document.getElementById('desc').value;
    
    
        // Post verilerini obje olarak oluştur
        const postData = {
            desc: desc,
    
        };
    
        // POST isteği göndermek için fetch kullanımı
        fetch(`${this.url}posts`, {
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
    }

    fetchPosts() {

        fetch(`${this.url}posts`) // Sunucu tarafında '/posts' endpoint'i bekliyorsa
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
   
  class SubsystemB {
    method() {
      console.log('This is a method of Subsystem-B');
    }
  }
   
  class SubsystemC {
    method() {
      console.log('This is a method of Subsystem-C');
    }
  }
  class Facade {
    constructor() {
      this.post = new post();
      this.subsystemB = new SubsystemB();
      this.subsystemC = new SubsystemC();
    }
   
    commonInterface() {
      this.post.fetchPosts();
      this.subsystemB.method();
      this.subsystemC.method();
    }
  }




