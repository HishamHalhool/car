async function loadJson(fileName) {
  try {
    const res = await fetch(fileName + ".json");

    const data = await res.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// loadJson("data");

const table = document.getElementById("table");

async function renderTable(data = null) {
  let html = `<tr class="tableHead">
                    <th>Booking ID</th>
                    <th>Booking Date</th>
                    <th>Client Name</th>
                    <th>Car Model</th>
                    <th>Plan</th>
                    <th>Date</th>
                    <th>Driver</th>
                    <th>Payment</th>
                    <th>Status</th>
                </tr>`;
  if (!data) {
    data = await loadJson("data");
  }

  data.forEach((element) => {
    let str = `
        <tr class="tableRows">
                       <td>${element.bookingId}</td>
                       <td>${element.bookingDate}</td>
                       <td>${element.clientName}</td>
                       <td>${element.carModel}</td>
                       <td>${element.plan}</td>
                       <td>${element.date}</td>
                       <td>${element.driver ? "-" : "^"}</td>
                       <td>${element.payment}</td>
                       <td>${element.status}</td>
                   </tr>
       `;
    html += str;
  });
  table.innerHTML = html;
}
renderTable();

document.getElementById("searchBar").addEventListener("input", async (e) => {
  const data = await loadJson("data");
  console.log(e.target.value);
  let newData = data.filter((car) => {
    if (
      car.clientName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      car.carModel.toLowerCase().includes(e.target.value.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  renderTable(newData);
});
