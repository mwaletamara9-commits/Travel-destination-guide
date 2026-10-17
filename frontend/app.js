const API = 'http://localhost:3000/api/destinations';
let editId = null;

async function fetchAll() {
  const res = await fetch(API);
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}

async function loadTable() {
  const list = await fetchAll();
  document.getElementById('count').textContent = list.length;
  document.getElementById('tableBody').innerHTML = list.map(d => `
    <tr>
      <td>${d.id}</td>
      <td><b>${d.name||d.title}</b><br><small>${d.country||''}</small></td>
      <td><span class="badge">${d.category||''}</span></td>
      <td class="actions">
        <button class="btn-edit" onclick="editDestination(${d.id})">Edit</button>
        <button class="btn-delete" onclick="deleteDestination(${d.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

async function saveDestination() {
  const payload = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    country: document.getElementById('country').value,
    image_url: document.getElementById('image_url').value,
    title: document.getElementById('name').value,
    image: document.getElementById('image_url').value
  };
  if(!payload.name){ alert('Name required'); return; }

  if(editId){
    await fetch(`${API}/${editId}`, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  } else {
    await fetch(API, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  resetForm();
  loadTable();
}

async function editDestination(id){
  const res = await fetch(`${API}/${id}`);
  const d = await res.json();
  const item = d.data || d;
  document.getElementById('name').value = item.name || item.title || '';
  document.getElementById('description').value = item.description || '';
  document.getElementById('category').value = item.category || '';
  document.getElementById('country').value = item.country || '';
  document.getElementById('image_url').value = item.image_url || item.image || '';
  editId = id;
  document.getElementById('formTitle').textContent = 'Edit Destination ID: ' + id;
  document.getElementById('submitBtn').textContent = 'Update Destination';
  document.getElementById('submitBtn').className = 'btn-update';
  document.getElementById('cancelBtn').style.display = 'block';
}

async function deleteDestination(id){
  if(!confirm('Delete this destination?')) return;
  await fetch(`${API}/${id}`, {method:'DELETE'});
  loadTable();
}

function resetForm(){
  editId = null;
  ['name','description','category','country','image_url'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('formTitle').textContent = 'Add Destination';
  document.getElementById('submitBtn').textContent = 'Add Destination';
  document.getElementById('submitBtn').className = 'btn-add';
  document.getElementById('cancelBtn').style.display='none';
}

loadTable();
