import * as React from "react";
import {Component} from "react";
import {useParams} from "react-router-dom";
import { get, post } from "../common/expressFunctions"
import Box from "@mui/material/Box";
import {AuctionModel} from "../models/AuctionModel";
import {VehicleModel} from "../models/VehicleModel";
import Button from "@mui/material/Button";
import './styles/Auction.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAuth} from "../hooks/useAuth";

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class SingleAuctionView extends Component {
    constructor(props) {
        super(props);

        const { auctionID } = this.props.params;

        this.state = {
            username: window.localStorage.getItem("user"),
            auctionID: auctionID,
            auction: {},
            didMount: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const {auctionID, startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin}
            = await get("/db/getAuction", {auctionID: this.state.auctionID})
        const {year, make, model, color, ownerID} = await get("/db/getVehicle", {vin})
        this.setState({
            auction: new AuctionModel(auctionID, startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin,
                new VehicleModel(vin, year, make, model, color, ownerID)),
            didMount: true
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const bid = new FormData(event.currentTarget).get("bid");
        post("/db/addBid", {
            auctionID: this.state.auctionID,
            username: "Clean",
            amount: bid
        })
    }

    render() {
        if(!this.state.didMount){
            return <h2>Loading Auctions...</h2>;
        }
        return (
            <div className="panel panel-default auction-body">
                <div className="auction-body">
                    <h2>{this.state.auction.vehicle.year + " " + this.state.auction.vehicle.color
                        + " " + this.state.auction.vehicle.make + " " + this.state.auction.vehicle.model}</h2>
                    <div>{"Ending: " + this.state.auction.endDate}</div>
                    <div>{"Current Bid: " + this.state.auction.currentBid}</div>
                    <div>{"Minimum Bid: " + this.state.auction.minBid}</div>
                    <div>{"Buyout: " + this.state.auction.buyOut}</div>
                </div>
                <Typography component="h1" variant="h5">
                    Place a Bid:
                </Typography>
                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <label>Please enter the bid price</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="bid"
                        label="Bid Price"
                        type="bid"
                        id="bid"
                        autoComplete="bid"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Place Bid
                    </Button>
                </Box>
            </div>
        );
    }
}

export default withParams(SingleAuctionView);