fetch("data/classification.json")
.then(res => res.json())
.then(data => {
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
});