window.addEventListener('DOMContentLoaded', function () {
    connectToWebSocket();
});

function connectToWebSocket() {
    const ws = new WebSocket('ws://127.0.0.1:8080'); // Replace with your WebSocket server address

    ws.onopen = () => {
        console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'workerLocation') {
            updateWorkerLocation(data.payload);
        } else if (data.type === 'workerHealth') {
            updateWorkerHealth(data.payload);
        } else if (data.type === 'machineData') {
            updateMachineData(data.payload);
        }
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
}

function updateWorkerLocation(locations) {
    const locationDiv = document.getElementById('worker-location');
    locationDiv.innerHTML = `<ul>${locations.map(loc => `<li>${loc.worker}: ${loc.zone}</li>`).join('')}</ul>`;
}

function updateWorkerHealth(healthData) {
    const healthDiv = document.getElementById('worker-health');
    healthDiv.innerHTML = `<ul>${healthData.map(worker => `<li>${worker.name}: ${worker.healthStatus}</li>`).join('')}</ul>`;
}

function updateMachineData(machineData) {
    const machineDiv = document.getElementById('machine-data');
    machineDiv.innerHTML = `<ul>${machineData.map(machine => `<li>${machine.id}: ${machine.status}</li>`).join('')}</ul>`;
}
