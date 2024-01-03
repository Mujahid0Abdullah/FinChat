const urlParams = new URLSearchParams(window.location.search);
const followedUserId = urlParams.get('userid');
const url = "https://fin-chat.onrender.com/"


document.getElementById('commentForm').addEventListener('click', function (event) {
    setfollow();
    check();

});
function check() {


    fetch(`${url}/follow/check?followedUserId=${followedUserId}`)
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


function setfollow() {



    const commentData = {
        userId: followedUserId,

    };


    fetch(`${url}follow`, {
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
