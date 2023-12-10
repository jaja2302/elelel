const L = require('../plugins/leaflet'); // Replace './plugins/leaflet.js' with the correct path to your Leaflet file

function main() {
  const baseUrl = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q='; 

  const getData = async (query) => {
    try {
      const response = await fetch(baseUrl + query); 
      if (response.ok) {
        const data = await response.json();
        renderData(data);
        createMap(data);
      } else {
        throw new Error('Error mengambil data');
      }
    } catch (error) {
      showResponseMessage(error);
    }
  };
  let map; 

  const createMap = (data) => {
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
  
    if (map) {
      map.off(); 
      map.remove(); 
    }

  
    map = L.map('map', {
      center: [lat, lon],
      zoom: 13,
    });
   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    
    L.marker([lat, lon]).addTo(map);
  };
  

  const renderData = (data) => {
    const listData = document.querySelector('#datalatin');
    const table = document.createElement('table');
    table.classList.add('table');
  
    // Create table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
      <tr>
        <th>Properties</th>
        <th>Data</th>
      </tr>
    `;
    table.appendChild(tableHeader);
  
    // Create table body
    const tableBody = document.createElement('tbody');
    for (const item in data[0]) {
      const row = document.createElement('tr');
      const propertyCell = document.createElement('td');
      const valueCell = document.createElement('td');
      propertyCell.textContent = item;
      valueCell.textContent = data[0][item];
      row.appendChild(propertyCell);
      row.appendChild(valueCell);
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
  
    listData.innerHTML = ''; 
    listData.appendChild(table);
  };
  const showResponseMessage = (message) => {
    alert(message);
  };

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]');
    const query = input.value.trim(); 
    if (query) {
      getData(query);
    } else {
      showResponseMessage('Masukan Nama kota');
    }
  });

}

export default main;
