
function togglePopup(event) {
    event.stopPropagation();
    var popup = document.getElementById("popup");
    popup.style.display = popup.style.display === "none" ? "block" : "none";
}

function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup(event) {
    if (event) {
        event.stopPropagation();
    }
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function openDynamicPopup() {
    console.log("Opening dynamic popup");
    var dynamicPopup = document.getElementById("dynamic-popup");
    dynamicPopup.style.display = "block";
}

function closeDynamicPopup() {
    var dynamicPopup = document.getElementById("dynamic-popup");
    dynamicPopup.style.display = "none";
}

function openProfilePage() {
    window.location.href = "./profile";
}

function cancelClosePopup() {
    clearTimeout(this.closePopupTimeout);
}

function closePopupWithDelay() {
    this.closePopupTimeout = setTimeout(() => {
        var popup = document.getElementById("popup");
        popup.style.display = "none";
<<<<<<< HEAD
    }

    openDynamicPopup() {
        console.log("Opening dynamic popup");
        var dynamicPopup = document.getElementById("dynamic-popup");
        dynamicPopup.style.display = "block";
    }

    closeDynamicPopup() {
        var dynamicPopup = document.getElementById("dynamic-popup");
        dynamicPopup.style.display = "none";
    }

    openProfilePage() {
        window.location.href = "profile.html";
    }

    cancelClosePopup() {
        clearTimeout(this.closePopupTimeout);
    }

    closePopupWithDelay() {
        this.closePopupTimeout = setTimeout(() => {
            var popup = document.getElementById("popup");
            popup.style.display = "none";
        }, 100); // 1 saniye gecikme
    }

}
=======
    }, 100); // 1 saniye gecikme
}
>>>>>>> 57171832fec011b12f33a49a9b5c584f09ad89e9
