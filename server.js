const express = require('express');
const app = express();

const vehicles = [
    { id: 1, make: 'Toyota', model: 'Corrolla', registrationNumber: 'NDW 369852', latitude: -33.918861, longitude: 18.423300 },
    { id: 2, make: 'Ford', model: 'EcoSport', registrationNumber: 'NUZ 741258', latitude: -26.20227000, longitude: 28.04363000 },
    { id: 3, make: 'Honda', model: 'Civic', registrationNumber: 'ND 36985', latitude: -33.918861, longitude: 18.423300 },
    { id: 4, make: 'Ford', model: 'Ranger', registrationNumber: 'NU 74158', latitude: -26.20227000, longitude: 28.04363000 },
    { id: 5, make: 'LandRover', model: 'Defender', registrationNumber: 'NDD 36852', latitude: -33.918861, longitude: 18.423300 },
    { id: 6, make: 'BMW', model: 'BMW M7', registrationNumber: 'NUM 74258', latitude: -26.20227000, longitude: 28.04363000 },
    
    
];

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});