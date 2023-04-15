import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";
import {Component} from "react";
import { get } from "../common/expressFunctions"
import {Link} from "react-router-dom";
import Auction from "./Auction";

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
        const auctionList = JSON.parse(await get("/db/getAllAuctions"));
        for (let auctionID = 0; auctionID < auctionList.length; auctionID++){

        }
        this.setState({
            didMount: true
        });updateLocalState(auctionList);
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
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <h2>Please view our auctions below</h2>
                    {this.state.auctions.map((auction, idx) => {
                        return (
                            <Link key={idx} to={`${auction.documentID}`}
                                  style={{color: 'inherit', textDecoration: 'inherit'}}>
                                <Auction key={idx} auction={auction}/>
                            </Link>
                        )
                    })}
                </Box>
            </Container>
        )
    }
}