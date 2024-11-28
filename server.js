const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    setInterval(() => {
        ws.send(JSON.stringify({
            type: 'workerLocation',
            payload: [
                { worker: 'John', zone: 'Danger Zone 1' },
                { worker: 'Alice', zone: 'Safe Zone' }
            ]
        }));

        ws.send(JSON.stringify({
            type: 'workerHealth',
            payload: [
                { name: 'John', healthStatus: 'Normal' },
                { name: 'Alice', healthStatus: 'High Heart Rate' }
            ]
        }));

        ws.send(JSON.stringify({
            type: 'machineData',
            payload: [
                { id: 'Excavator1', status: 'Operational' },
                { id: 'Crane2', status: 'Maintenance Required' }
            ]
        }));
    }, 5000); // Send updates every 5 seconds
});
