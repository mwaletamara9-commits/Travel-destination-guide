const API_URL = "/api/destinations";
let editingId = null;

async function loadDestinations() {
  try {
    const res = await fetch(API_URL);
    const list = await res.json();
    
    const countH2 = document.querySelector("h2");
    if(countH2) countH2.textContent = `All Destinations (${list.length})`;
    
    const tbody = document.querySelector("tbody");
    if(!tbody) return;
    
    tbody.innerHTML = "";
    list.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.id.slice(-4)}</td>
        <td>${d.name || d.destination || ''}</td>
        <td>${d.category || ''}</td>
        <td>${d.country || ''}</td>
        <td>
          <button onclick="editDestination('${d.id}')">Edit</button>
          <button onclick="deleteDestination('${d.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch(e){ console.error(e); }
}

async function addDestination() {
  const inputs = document.querySelectorAll("input");
  const payload = {
    name: inputs[0].value,
    destination: inputs[0].value,
    category: inputs[1].value,
    country: inputs[2].value,
    imageUrl: inputs[3].value,
    description: inputs[4].value
  };

  if(!payload.name){ alert("Please type Destination Name"); return; }

  if(editingId){
    // PUTTY - Update
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    editingId = null;
    document.querySelector("button").textContent = "Add Destination";
  } else {
    // POSTY - Create
    await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
  }

  inputs.forEach(i => i.value = "");
  loadDestinations();
}

function editDestination(id){
  // GETTY by ID then load into form
  fetch(`${API_URL}/${id}`)
    .then(r=>r.json())
    .then(d=>{
      const inputs = document.querySelectorAll("input");
      inputs[0].value = d.name || d.destination || '';
      inputs[1].value = d.category || '';
      inputs[2].value = d.country || '';
      inputs[3].value = d.imageUrl || d.image || '';
      inputs[4].value = d.description || '';
      editingId = id;
      document.querySelector("button").textContent = "Update Destination";
      window.scrollTo(0,0);
    });
}

async function deleteDestination(id){
  if(!confirm("Delete this?")) return;
  await fetch(`${API_URL}/${id}`, {method:"DELETE"});
  loadDestinations();
}

// Auto load on start - GETTY all
loadDestinations();
