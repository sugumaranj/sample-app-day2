import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="dashboard-header">
    <span class="tag">Day 2 Practical Stack</span>
    <h1>⚡ Vite + Docker Compose + Jenkins CI/CD</h1>
    <p>Automated Local Deployment Architecture Demo</p>
  </div>

  <div class="grid">
    <div class="card">
      <h3>Frontend Service</h3>
      <p><span class="status-indicator"></span> Vite App running on port 3000</p>
      <div class="pipeline-stage">
        <span>Build Engine</span>
        <strong>Vite 5.x</strong>
      </div>
    </div>

    <div class="card">
      <h3>Backend Microservice</h3>
      <p><span class="status-indicator"></span> Node/Express API running on port 5000</p>
      <div class="pipeline-stage">
        <span>API Status</span>
        <span id="api-status">Connecting...</span>
      </div>
    </div>

    <div class="card">
      <h3>Jenkins Pipeline</h3>
      <p><span class="status-indicator"></span> Jenkins CI running on port 8080</p>
      <div class="pipeline-stage">
        <span>Pipeline Trigger</span>
        <strong>Git Push -> Auto Build</strong>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>🧪 Test API Connection</h3>
    <p>Click below to make an automated HTTP GET request to the Docker Compose backend service.</p>
    <button id="test-btn" class="btn-action">Ping Express Backend Service</button>
    <pre id="api-response" style="margin-top: 15px; background: #0d1117; padding: 10px; border-radius: 6px; display: none;"></pre>
  </div>
`;

const testBtn = document.getElementById('test-btn');
const apiStatus = document.getElementById('api-status');
const apiResponse = document.getElementById('api-response');

async function checkApi() {
  try {
    const res = await fetch('http://localhost:5000/api/status');
    const data = await res.json();
    apiStatus.textContent = 'Online (' + data.service + ')';
    apiStatus.style.color = '#3fb950';
  } catch (err) {
    apiStatus.textContent = 'Backend Offline';
    apiStatus.style.color = '#f85149';
  }
}

checkApi();

testBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:5000/api/status');
    const data = await res.json();
    apiResponse.style.display = 'block';
    apiResponse.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    apiResponse.style.display = 'block';
    apiResponse.textContent = 'Error connecting to Express backend API on port 5000.';
  }
});
