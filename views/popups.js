class PopupManager {
    constructor() {
        this.closePopupTimeout = null;
    }

    togglePopup(event) {
        event.stopPropagation();
        var popup = document.getElementById("popup");
        popup.style.display = popup.style.display === "none" ? "block" : "none";
    }

    openPopup() {
        var popup = document.getElementById("popup");
        popup.style.display = "block";
    }

    closePopup(event) {
        if (event) {
            event.stopPropagation();
        }
        var popup = document.getElementById("popup");
        popup.style.display = "none";
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