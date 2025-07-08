const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");

const showError = (message) => {
   errorMsg.textContent = message;
   errorMsg.style.display = "block";
};

const hideError = () => {
   errorMsg.textContent = "";
   errorMsg.style.display = "none";
};

window.addEventListener("DOMContentLoaded", () => {
   loading.style.display = "block";
   hideError();

   // fetch classification data
   fetch("https://lotto-classification-api.netlify.app/.netlify/functions/classification")
      .then(res => {
         if(!res.ok) throw new Error(`Fetch failed: ${res.status}`);

         return  res.json();
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
                  <td>${num.stringKey}</td>
                  <td>${num.shadow}</td>
                  <td>${num.partner}</td>
                  <td>${num.enquivalent}</td>
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
         } else {
            showError("Server Error: Failed to load data. Please try again later.");     
         }
         console.error("API error:", err);
      })
      .finally(() => {
         loading.style.display = "none";
      })
});
