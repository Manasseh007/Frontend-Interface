document.getElementById('vehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(this);
    const vehicleData = {};
    formData.forEach(function(value, key){
        vehicleData[key] = value;
    });
    const URL = 'http://localhost:9293/api/vehicles';
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicleData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Vehicle registered:', data);
    })
    .catch(error => {
        console.error('Error registering vehicle:', error);
    });
});

// Function to fetch vehicle data from the backend
function fetchVehicleData() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'jdbc:mysql://localhost:3306/VehicleTrackingSystem', 
        user: 'springstudent',
        password: 'springstudent',
        database: 'VehicleTrackingSystem'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');
    });

    connection.query('SELECT * FROM Vehicle', (err, results) => {
        if (err) {
            console.error('Error fetching vehicle data:', err);
            return;
        }
        console.log('Vehicle data:', results);
        // Process the fetched vehicle data as needed
        const processedVehicleData = results.map(vehicle => {
            return {
                id: vehicle.id,
                make: vehicle.make,
                model: vehicle.model,
                registrationNumber: vehicle.registrationNumber,
                location: {
                    latitude: vehicle.latitude,
                    longitude: vehicle.longitude
                }
            };
        });
        console.log('Processed vehicle data:', processedVehicleData);

    });
    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
            return;
        }
        console.log('MySQL connection closed');
    });
    
    fetch('http://localhost:9293/api/vehicles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayVehicleLocations(data);
        })
        .catch(error => {
            console.error('Error fetching vehicle data:', error);
        });
}

// Function to display vehicle locations on the map
function displayVehicleLocations(vehicleData) {
    // Initialize Leaflet map
    var map = L.map('map').setView([51.505, -0.09], 13);
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const vehicleLocations = [
        { latitude: -33.918861, longitude: 18.423300 },
        { latitude: -26.20227000, longitude: 28.04363000 }
    ];
    vehicleLocations.forEach(location => {
        L.marker([location.latitude, location.longitude]).addTo(map);
        var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`<b>Vehicle ID:</b> ${vehicle.vehicleID}<br><b>Make:</b> ${vehicle.make}<br><b>Model:</b> ${vehicle.model}<br><b>Registration Number:</b> ${vehicle.registrationNumber}`);
        
    });
    vehicleLocations.forEach(location => {
        L.marker([location.latitude, location.longitude]).addTo(map);
        var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`<b>Vehicle ID:</b> ${vehicle.vehicleID}<br><b>Make:</b> ${vehicle.make}<br><b>Model:</b> ${vehicle.model}<br><b>Registration Number:</b> ${vehicle.registrationNumber}`);

    });
}
window.onload = function() {
    fetchVehicleData();
};
