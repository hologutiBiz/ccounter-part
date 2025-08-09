const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");
const mainElement = document.getElementById("main-container")

const showError = (message) => {
   errorMsg.textContent = message;
   errorMsg.style.display = "block";
   mainElement.style.display = "none";
};

const hideError = () => {
   errorMsg.textContent = "";
   errorMsg.style.display = "none";
};

window.addEventListener("DOMContentLoaded", () => {
   loading.style.display = "block";
   mainElement.style.display = "none";
   hideError();

   // fetch classification data
   fetch("https://lotto-classification-api.netlify.app/.netlify/functions/classification")
      .then(res => {
         if(!res.ok) throw new Error(`Fetch failed: ${res.status}`);

         return res.json();
      })
      .then(data => {
         if (!data || !data.one_to_fortyfive) throw new Error("No valid data received");
         const fillTable = (dataset, tbodyId) => {
            const tbody = document.getElementById(tbodyId);
            dataset.forEach(num => {
               const row = document.createElement("tr");
               row.innerHTML = `
                  <td class="num">${num.number}</td>
                  <td>${num.counterpart}</td>
                  <td>${num.bonanza}</td>
                  <td>${num.malta}</td>
                  <td>${num.stringkey}</td>
                  <td>${num.shadow}</td>
                  <td>${num.partner}</td>
                  <td>${num.equivalent}</td>
                  <td>${num.code}</td>
                  <td>${num.turning}</td>
               `;
               tbody.appendChild(row);
            });
         };

         fillTable(data.one_to_fortyfive, "oneToFortyfive");
         fillTable(data.fortysix_to_ninety, "fortysixToNinety");
         console.log(data);
      })
      .catch(err => {
         if(!navigator.onLine) {
            showError("No internet connection. Please check your network.");  
            // mainElement.style.display = "none";
    
         } else {
            showError("Server Error: Failed to load data. Please try again later.");
            // mainElement.style.display = "none";
         }
      })
      .finally(() => {
         loading.style.display = "none";
         // mainElement.style.display = "block";
      })
});

// Lotto Classification Chart app
var counterpartQrCode = new QRCode("counterpart_qrCode", {
   text: "https://play.google.com/store/apps/details?id=com.visuallottoboard.lottoclassificationchart",
   colorDark: "#000000",
   colorLight: "#ffffff",
   correctLevel : QRCode.CorrectLevel.H
});

window.addEventListener("offline", () => {
   showError("No internet connection");
   mainElement.style.display = "none";
});

window.addEventListener("online", () => {
   hideError();
   mainElement.style.display = "block";
})
