const express = require('express');
const DBConnection = require('./src/Database/DBConnection')

const app = express();

// // Serve the static files from the React app
// app.use(express.static('../client/build'));

// Using bodyParser middleware
app.use(express.json())

// API endpoints start here
app.get('/db/login', async (req,res) => {
    const {username, password} = req.query;
    res.json(JSON.stringify(await DBConnection.verifyUserPassword({username, password})));
});

app.post('/db/register', async (req,res) => {
    const { username, password, fName, lName, address, cardNumber} = req.body;
    res.json(await DBConnection.addUser(
        {fName, lName, address, cardNumber, username, password}));
});

app.get('/db/isAdmin', async (req,res) => {
    const {username} = req.query;
    res.json(await DBConnection.verifyAdmin({adminID: await DBConnection.getUserIDFromUsername({username})}));
});

app.post('/db/addAuction', async (req,res) => {
    const {startDate, endDate, minBid, buyOut, currentBid, adminID, vin, year, make, model, color, ownerID} = req.body;
    await DBConnection.addVehicleWithVIN({vin, year, make, model, color, ownerID})
    res.json(await DBConnection.addAuction(
        {startDate, endDate, minBid, buyOut, currentBid, adminID, vin}));
});

app.post('/db/addBid', async (req,res) => {
    const {auctionID, username, amount} = req.body;
    res.json(await DBConnection.addBid(
        {auctionID, username, amount}));
});

app.get('/db/getAllAuctions', async (req,res) => {
    const allAuctions = await DBConnection.getAllAuctions()
    let auctionJSON = [];
    for (let auctionIndex = 0; auctionIndex < allAuctions.length; auctionIndex++){
        auctionJSON.push(JSON.stringify(allAuctions[auctionIndex]));
    }res.json(auctionJSON);
});

app.get('/db/getAuction', async (req,res) => {
    const {auctionID} = req.query;
    const auction = await DBConnection.getAuctionFromID({auctionID})
    res.json(auction[0]);
});

app.get('/db/getVehicle', async (req,res) => {
    const {vin} = req.query;
    const vehicle = await DBConnection.getVehicleFromID({vin})
    res.json(vehicle);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    console.log("bad request URL")
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
