//const { Console } = require("console");

async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");

  // for testing the table load
  // const response = await fetch("http://localhost/files/data.json");
  // const { headers, rows } = await response.json();

  // load the API Data by OpenMensa (documentation: https://doc.openmensa.org/api/v2/canteens/)
  let response = await fetch(url);
  const data = await response.json();

  //the data by the API is reorganized to use for the tablegeneration
  let headers;
  let rows = [];
  let isFirst = true;
  //forEach element split the information into keys and values
  data.forEach((e) => {
    let keys = [];
    let values = [];
    for (const [key, value] of Object.entries(e)) {
      keys.push(key);
      //if a value is an Array convert it to a single value (string)
      if (Array.isArray(value)) {
        values.push(value.join());
      } else {
        values.push(value);
      }
    }
    //check if the keys of an element in data is different then the others
    if (isFirst != true && headers.join() != keys.join()) {
      console.log("There are differnt keys per object.");
    } else {
      isFirst = false;
    }
    // the header should always be the same
    headers = keys;
    //add the data of e
    rows.push(values);
  });

  // with headers (namesensitive) and rows (namesensitive) generate table elements and add them to the html
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (const headerText of headers) {
    // for each header element
    const headerElement = document.createElement("th"); // a header element is generated in the html
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement); // and put into the header row
  }

  for (const row of rows) {
    // for each header element
    const rowElement = document.createElement("tr"); // a element is generated in the html

    for (const cellText of row) {
      const cellElement = document.createElement("td");
      cellElement.textContent = cellText;
      rowElement.appendChild(cellElement);
    }
    tableBody.appendChild(rowElement);
  }
}

async function fill(offset) {
  let todayDate = new Date(); // getting todays date for url
  todayDate.setDate(todayDate.getDate() + offset);
  let dateString = todayDate.toISOString().slice(0, 10); // converting date to string
  loadIntoTable("https://openmensa.org/api/v2/canteens/387/days/" + dateString + "/meals", // loading table with date
    document.querySelector(".table"));
  document.getElementById("menu").innerHTML = dateString; //funktioniert jetzt
}

let offset = 0;
let buttonback = document.getElementById("back").addEventListener("click", function () { fill(offset -= 1) });
let buttonvor = document.getElementById("vor").addEventListener("click", function () { fill(offset += 1) });

//"https://openmensa.org/api/v2/canteens/387/days/2022-05-03/meals"