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

/*
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
*/

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
