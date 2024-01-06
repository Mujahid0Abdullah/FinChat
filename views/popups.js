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
function istekAt() {
    // Her istek atıldığında console ekranına istek başarılı bir şekilde atıldı mesajı verelim
    console.log('İstek başarılı bir şekilde atıldı');

    // JSON verisini çekelim
    fetch('https://finans.truncgil.com/v3/today.json')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          console.log(data["14-ayar-altin"].Buying)
          console.log(data["22-ayar-bilezik"].Buying)
           document.getElementById('dolar-try').textContent ="USD TO TR: "+data["USD"].Buying;
         document.getElementById('euro-try').textContent="EUR TO TR: "+data["EUR"].Buying;
            document.getElementById('sterlin-try').textContent="GBP TO TR: "+data["GBP"].Buying;
            document.getElementById('pln-try').textContent="PLN TO TR: "+data["PLN"].Buying;

          document.getElementById('22altin').textContent="22 Ayar Altın: "+data["22-ayar-bilezik"].Buying;

          document.getElementById('Caltin').textContent="Çeyrek Altın"+data["ceyrek-altin"].Buying;
          document.getElementById('gumus').textContent="Gümüş: "+data["gumus"].Buying;
          document.getElementById('cumhuriyet-altini').textContent="C. Altını: "+data["cumhuriyet-altini"].Buying;
    

      
        

        // Bir sonraki isteği 10 saniye sonra atalım
        
      })
      .catch(error => console.error('Veri alınamadı:', error));
  }
  istekAt();

  function updateData() {
    
   

    // CoinGecko API'sinden veri çekme
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,dogecoin&vs_currencies=try')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
    
          console.log(data.bitcoin.try)
        // Kripto paraların fiyatlarını alm
        document.getElementById('bitcoin').textContent= "Bitcoin: "+data.bitcoin.try
        document.getElementById('Ethereum').textContent="Ethereum: "+data.ethereum.try
        document.getElementById('Litecoin').textContent="Litecoin: "+data.litecoin.try
        document.getElementById('Dogecoin').textContent="Dogecoin: "+data.dogecoin.try
       
        // İstek başarılı olduğunda konsola mesaj yazdırma
        console.log('İstek başarıyla yapıldı.');

        // İstek sayısını artırma
       
      })
      .catch(error => {
        console.error('API çağrısı sırasında bir hata oluştu:', error);
      });
  }
  updateData();

function getExchangeRates() {
    const apiKey = 'e2d37d6b14c2e615ce74c8d0';
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
//getExchangeRates();

