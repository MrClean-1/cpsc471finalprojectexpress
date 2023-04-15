import * as React from "react";
import {Component} from "react";
import { get } from "../common/expressFunctions"
import {Link} from "react-router-dom";
import Auction from "./Auction";
import {AuctionModel} from "../models/AuctionModel";
import {VehicleModel} from "../models/VehicleModel";

//TODO
// Not 100% sure what I need for this yet
// Need to be able to query the database, I could make the user select Truck/Car/SUV
// I could search by the name of the vehicle or by the name of the manufacturer.
// if I had a function that returned a list of auctions and I gave it search parameters that would be awesome
// Or you could save work and give me a list of AuctionID's that fit the search.
// I already need a function that gives me the details of an auction by AuctionID
// This method could be used here to get me enough info to display the things we need to show
// ---
// This part is required when I need to make the search clickable, placing it here
// so I can route to a single auction page
// ---
// {this.state.posts.map((post, idx) => {
//     return (
//         <Link key={idx} to={`${post.documentID}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
//             <Post key={idx} post={post}/>
//         </Link>
//     )
// })}

export class SearchAuctionsPage extends Component {
    constructor(props) {
        super(props);

        this.updateLocalState = this.updateLocalState.bind(this);

        this.state = {
            auctions: [],
            didMount: false
        }
    }

    async componentDidMount() {
        const {updateLocalState} = this;
        const auctionList = await get("/db/getAllAuctions");
        let auctionObjects = [];
        for (let auctionIndex = 0; auctionIndex < auctionList.length; auctionIndex++){
            console.log(auctionList[auctionIndex])
            const {auctionID, startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin}
                = JSON.parse(auctionList[auctionIndex]);
            const {year, make, model, color, ownerID} = await get("/db/getVehicle", {vin})
            auctionObjects.push(
                new AuctionModel(auctionID, startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin,
                new VehicleModel(vin, year, make, model, color, ownerID)))
        }
        this.setState({
            didMount: true
        });updateLocalState(auctionObjects);
    }

    updateLocalState(auctionList) {
        this.setState({
            auctions: auctionList,
        });
    }
    render() {
        if(!this.state.didMount){
            return <h2>Loading Auctions...</h2>;
        }
        return (
            <div>
                <h1 style={{margin: '1em 18%'}}>Click on an Auction to view it</h1>
                {this.state.auctions.map((auction, idx) => {
                    return (
                        <Link key={idx} to={`${auction.auctionID}`}
                              style={{color: 'inherit', textDecoration: 'inherit'}}>
                            <Auction key={idx} auction={auction}/>
                        </Link>
                    )
                })}
            </div>
        )
    }
}