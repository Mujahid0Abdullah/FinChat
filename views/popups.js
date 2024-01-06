function followUnfollow() {




}



//skkekfrekfrk
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

function goToHome( ) {
    window.location = `${url}home`
}

function closePopupWithDelay() {
    closePopupTimeout = setTimeout(function () {
        var popup = document.getElementById("popup");
        popup.style.display = "none";

    }, 100); // 1 saniye gecikme
};

function getExchangeRates() {
    const apiKey = '1bcf3f77aed6bcf6430e283f';
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

// API'den döviz kuru verilerini almak için fonksiyonu çağıralım
getExchangeRates();

