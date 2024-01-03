
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
    window.location.href = "profile.html";
}

function cancelClosePopup() {
    clearTimeout(this.closePopupTimeout);
}

function closePopupWithDelay() {
    this.closePopupTimeout = setTimeout(() => {
        var popup = document.getElementById("popup");
        popup.style.display = "none";
    }, 100); // 1 saniye gecikme
}
