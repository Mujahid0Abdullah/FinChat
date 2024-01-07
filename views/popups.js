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
/*
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
           document.getElementById('dolar-try').textContent ="USD To TR: "+data["USD"].Buying;
         document.getElementById('euro-try').textContent="EUR To TR: "+data["EUR"].Buying;
            document.getElementById('sterlin-try').textContent="GBP To TR: "+data["GBP"].Buying;
            document.getElementById('pln-try').textContent="PLN To TR : "+data["PLN"].Buying;

          document.getElementById('22altin').textContent="22 Ayar Altın: "+data["22-ayar-bilezik"].Buying;

          document.getElementById('Caltin').textContent="Çeyrek Altın: "+data["ceyrek-altin"].Buying;
          document.getElementById('gumus').textContent="Gümüş: "+data["gumus"].Buying;
          document.getElementById('cumhuriyet-altini').textContent="C. Altını: "+data["cumhuriyet-altini"].Buying;
    

      
        

        // Bir sonraki isteği 10 saniye sonra atalım
        
      })
      .catch(error => console.error('Veri alınamadı:', error));
  }
  istekAt();
*/
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



// API'den döviz kuru verilerini almak için fonksiyonu çağıralım
//getExchangeRates();

