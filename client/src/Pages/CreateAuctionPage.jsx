import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CreateIcon from '@mui/icons-material/Create';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { post } from "../common/expressFunctions"

//TODO
// Need the required function that creates a new auction.
// You can decide what values you need to do this, and I will provide them.
// Maybe this method should return true/false if the creation of a new auction worked

//{startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin, year, make, model, color, ownerID}
//await post("/db/register", data)
//             .catch(console.error)

export const CreateAuctionPage = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params = {
            startDate: data.get("startDate"),
            endDate: data.get("endDate"),
            minBid: data.get("minBid"),
            buyOut: data.get("buyOut"),
            currentBid: data.get("currentBid"),
            adminID: data.get("adminID"),
            vin: data.get("vin"),
            year: data.get("year"),
            make: data.get("make"),
            model: data.get("model"),
            color: data.get("color"),
            ownerID: data.get("ownerID")
        }
        console.log(params)
        post("/db/addAuction", params).then(response => {
            console.log(response)
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create an Auction
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <label>Please enter the details of the vehicle</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="vin"
                        label="VIN"
                        type="vin"
                        id="vin"
                        autoComplete="vin"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="year"
                        label="Year"
                        type="year"
                        id="year"
                        autoComplete="year"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="make"
                        label="Make"
                        type="make"
                        id="make"
                        autoComplete="make"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="model"
                        label="Model"
                        type="model"
                        id="model"
                        autoComplete="model"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="color"
                        label="Color"
                        name="color"
                        autoComplete="color"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="ownerID"
                        label="Owner ID"
                        type="ownerID"
                        id="ownerID"
                        autoComplete="Owner-ID"
                    />
                    <label>Please enter the details of the auction</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="startDate"
                        label="Start Date (YYYY-MM-DD)"
                        type="startDate"
                        id="startDate"
                        autoComplete="start-date"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="endDate"
                        label="End Date (YYYY-MM-DD)"
                        type="endDate"
                        id="endDate"
                        autoComplete="end-date"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="minBid"
                        label="Min Bid"
                        type="minBid"
                        id="minBid"
                        autoComplete="minBid"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="buyOut"
                        label="Buy Out"
                        type="buyOut"
                        id="buyOut"
                        autoComplete="buy-out"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="currentBid"
                        label="Current Bid"
                        name="currentBid"
                        autoComplete="currentBid"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="adminID"
                        label="Admin ID"
                        type="adminID"
                        id="adminID"
                        autoComplete="admin-ID"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};