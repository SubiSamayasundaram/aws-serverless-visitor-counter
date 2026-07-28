
const API_URL = "https://1f4a6f7zcf.execute-api.ap-south-1.amazonaws.com/count";

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function greet() {
  const name = document.getElementById('nameInput').value || 'Guest';
  document.getElementById('greetOutput').textContent =
    `Hello, ${name}! Fetching your visit count from the live backend...`;
  recordVisit(name);
}

async function recordVisit(name) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    document.getElementById('greetOutput').textContent =
      `Hello, ${name}! You are visitor number ${data.visit_count}. ` +
      `(Recorded live via Lambda + DynamoDB at ${new Date(data.timestamp).toLocaleTimeString()})`;
  } catch (err) {
    document.getElementById('greetOutput').textContent =
      `Hello, ${name}! (Backend not reachable yet — check your API_URL in script.js)`;
    console.error(err);
  }
}

// Auto-fetch count on page load too, so the number is visible immediately
window.addEventListener('DOMContentLoaded', () => {
  if (API_URL !== "PASTE_YOUR_API_GATEWAY_URL_HERE") {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        const p = document.createElement('p');
        p.className = 'note';
        p.textContent = `Total visits so far: ${data.visit_count}`;
        document.querySelector('main').prepend(p);
      })
      .catch(() => {});
  }
});
