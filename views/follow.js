const urlParamss = new URLSearchParams(window.location.search);
const followedUserId = urlParamss.get('userid');
const urls = "https://fin-chat.onrender.com/";

/*
function checkAndToggleFollowButton() {
    const relationshipButton = document.getElementById('follow-unfollowButton');

    fetch(`${urls}follow/check?followedUserId=${followedUserId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('İlişki var mı?', data); // İlişki varsa true, yoksa false

            if (data === true) {
                relationshipButton.textContent = 'Unfollow';
                console.log("un");
            } else {
                relationshipButton.textContent = 'Follow';
                console.log("fo");
            }
        })
        .catch(error => {
            console.error('Hata oluştu:', error);
            // Hata durumunda gerekli işlemler burada yapılabilir
        });
}

// Sayfa yüklendiğinde ve butona tıklandığında tetiklenecek fonksiyonlar
checkAndToggleFollowButton(); // Sayfa yüklendiğinde durumu kontrol et



document.getElementById('follow-unfollowButton').addEventListener('click', function () {
    const button = document.getElementById('follow-unfollowButton');

    if (button.textContent === 'Follow') {
        setfollow().then(() => {
            console.log("set");
            setTimeout(checkAndToggleFollowButton, 100); // 100 milisaniye sonra durumu yeniden kontrol et
        }).catch(error => {
            console.error('Error:', error);
            // Hata durumunda gerekli işlemler burada yapılabilir
        });
    } else {
        delfollow().then(() => {
            console.log("del");
            setTimeout(checkAndToggleFollowButton, 100); // 100 milisaniye sonra durumu yeniden kontrol et
        }).catch(error => {
            console.error('Error:', error);
            // Hata durumunda gerekli işlemler burada yapılabilir
        });
    }
});


/*
function setfollow() {



    const commentData = {
        userId: followedUserId,

    };


    fetch(`${urls}follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('POST', data);

        })

        .catch(error => {
            console.error('There was an error!', error);
        });

}


function delfollow() {
    const commentData = {
        userId: followedUserId,

    };


    fetch(`${urls}follow`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('DELETE', data);

        })

        .catch(error => {
            console.error('There was an error!', error);
        });

}
*/








class FollowButtonObserver {
  constructor(buttonElement) {
    this.button = buttonElement;
    this.isFollowing = false;
  }

  update(isFollowing) {
    this.isFollowing = isFollowing;
    this.button.textContent = isFollowing ? 'Unfollow' : 'Follow';
  }
}

class FollowSubject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    this.observers.forEach(observer => observer.update(this.isFollowing));
  }

  async checkFollowStatus(followedUserId) {
    const response = await fetch(`${urls}follow/check?followedUserId=${followedUserId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    this.isFollowing = data;
    this.notify();
  }

  async follow(followedUserId) {
    const response = await fetch(`${urls}follow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: followedUserId })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    this.isFollowing = true;
    this.notify();
  }

  async unfollow(followedUserId) {
    const response = await fetch(`${urls}follow`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: followedUserId })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    this.isFollowing = false;
    this.notify();
  }
}

const followSubject = new FollowSubject();
const buttonObserver = new FollowButtonObserver(document.getElementById('follow-unfollowButton'));
followSubject.attach(buttonObserver);

// Initial check on page load
followSubject.checkFollowStatus(followedUserId);

// Button click handler
document.getElementById('follow-unfollowButton').addEventListener('click', async () => {
  try {
    if (buttonObserver.isFollowing) {
      await followSubject.unfollow(followedUserId);
    } else {
      await followSubject.follow(followedUserId);
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle error appropriately
  }
});

/*document.getElementById( 'follow-unfollowButton').addEventListener('click', function () {
    if (document.getElementById('follow-unfollowButton').textContent === 'Follow') {
        setfollow();
        console.log("set");

    } else {
        console.log("del");

        delfollow();
    }
    checkAndToggleFollowButton(); // Butona tıklandığında durumu yeniden kontrol et
});*/

/*
check();
document.getElementById('follow-unfollowButton').addEventListener('click', function () {

    if (check()) { delfollow() } else { setfollow(); }
    check();

});
function check() {


    fetch(`${urls}follow/check?followedUserId=${followedUserId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('İlişki var mı?', data); // İlişki varsa true, yoksa false


            const relationshipButton = document.getElementById('follow-unfollowButton');

            if (data === true) {
                relationshipButton.textContent = 'Unfollow';
            } else {
                relationshipButton.textContent = 'Follow';
            }


            // İşlem yapmak için bu veriyi kullanabilirsiniz
        })
        .catch(error => {
            console.error('Hata oluştu:', error);
            // Hata durumunda gerekli işlemler burada yapılabilir
        });


}
*//*
document.getElementById('follow-unfollowButton').addEventListener('click', async function () {
    try {
        if (document.getElementById('follow-unfollowButton').textContent === 'Follow') {
            await setfollow(); // setfollow'un async olmasını bekliyor
            console.log("set");
        } else {
            console.log("del");
            await delfollow(); // delfollow'un async olmasını bekliyor
        }
        await checkAndToggleFollowButton(); // checkAndToggleFollowButton'un async olmasını bekliyor
    } catch (error) {
        console.error("Hata:", error);
        // Hata durumunda yapılacak işlemler
    }
});*/