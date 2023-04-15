const express = require('express');
const path = require('path');
const DBConnection = require('./src/Database/DBConnection')
const bodyParser = require('body-parser')

const app = express();

// // Serve the static files from the React app
// app.use(express.static('../client/build'));

// Using bodyParser middleware
app.use(express.json())

// API endpoints start here
app.get('/db/login', async (req,res) => {
    const {username, password} = req.query;
    res.json(await DBConnection.verifyUserPassword({username, password}));
});

app.post('/db/register', async (req,res) => {
    const { username, password, fName, lName, address, cardNumber} = req.body;
    res.json(await DBConnection.addUser(
        {fName, lName, address, cardNumber, username, password}));
});

app.get('/db/isAdmin', async (req,res) => {
    const {username} = req.query;
    res.json(await DBConnection.verifyAdmin({username}));
});

app.post('/db/addAuction', async (req,res) => {
    const {startDate, endDate, minBid, buyOut, currentBid, adminID, vin, year, make, model, color, ownerID} = req.body;
    console.log(req.body)
    await DBConnection.addVehicle({year, make, model, color, ownerID})
    res.json(await DBConnection.addAuction(
        {startDate, endDate, minBid, buyOut, currentBid, adminID, vin}));
});

app.get('/db/getAllAuctions', async (req,res) => {
    await DBConnection.addAdmin({userID: "3"})
    res.json(await DBConnection.getAllAuctions());
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    console.log("bad request URL")
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
