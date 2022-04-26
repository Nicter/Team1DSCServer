async function loadIntoTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch("http://localhost/files/data.json");
    // const response = await fetch("https://openmensa.org/api/v2/canteens/70");
    // console.log(data);
    const { headers, rows } = await response.json();
    // let headers = [];
    // let rows = [];
    // const data = await response.json();
    // JSON.parse(await response, (key, value) => {
    //         headers.push(key);
    //         rows.push(value);
    //     });
    // const data = await response.text();

    // console.log(data);
    
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const headerText of headers) { // for each header element
        const headerElement = document.createElement("th"); // a header element is generated in the html
        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement); // and put into the header row
    }

    for (const row of rows) { // for each header element
        const rowElement = document.createElement("tr")// a element is generated in the html

        for (const cellText of row) {
            const cellElement = document.createElement("td");
            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
    
}

loadIntoTable('../data.json', document.querySelector(".table")); //

