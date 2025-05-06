async function fetchStatusList() {
  const res = await fetch('https://networkingproblem.pages.dev/api/status');
  const data = await res.json();
  const list = document.getElementById('status-list');
  list.innerHTML = '';

  data.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name}: ${entry.status}`;
    list.appendChild(li);
  });
}

document.getElementById('status-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const status = document.getElementById('status').value;

  await fetch('https://networkingproblem.pages.dev/api/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, status }),
  });

  fetchStatusList();
});

fetchStatusList();
setInterval(fetchStatusList, 10000); // refresh every 10 seconds
