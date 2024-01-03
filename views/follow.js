const urlParamss = new URLSearchParams(window.location.search);
const followedUserId = urlParamss.get('userid');
const urls = "https://fin-chat.onrender.com/";


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
            } else {
                relationshipButton.textContent = 'Follow';
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
    if (document.getElementById('follow-unfollowButton').textContent === 'Follow') {
        setfollow();
    } else {
        delfollow();
    }
    checkAndToggleFollowButton(); // Butona tıklandığında durumu yeniden kontrol et
});

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
*/

function setfollow() {



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
            console.log('comment eklendi:', data);

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
            console.log('comment eklendi:', data);

        })

        .catch(error => {
            console.error('There was an error!', error);
        });

}
