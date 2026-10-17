const API_URL = "/api/destinations";

async function loadDestinations(){
  const res = await fetch(API_URL);
  const list = await res.json();
  
  document.querySelector("h2").textContent = `All Destinations (${list.length})`;
  
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  list.forEach(d => {
    tbody.innerHTML += `<tr><td>${d.id.slice(-4)}</td><td>${d.name}</td><td>${d.category}</td><td>${d.country}</td><td><button onclick="deleteDestination('${d.id}')">Delete</button></td></tr>`;
  });
}

async function addDestination(){
  const inputs = document.querySelectorAll("input");
  const payload = {
    name: inputs[0].value,
    category: inputs[1].value,
    country: inputs[2].value,
    imageUrl: inputs[3].value,
    description: inputs[4].value
  };
  
  if(!payload.name) return alert("Type name first!");
  
  await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  
  // THIS CLEARS BOXES - So you can type Zambia next!
  inputs.forEach(inp => inp.value = "");
  
  loadDestinations();
}

async function deleteDestination(id){
  await fetch(`${API_URL}/${id}`, {method:"DELETE"});
  loadDestinations();
}

loadDestinations();
