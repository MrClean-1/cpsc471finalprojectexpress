import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";

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

export const SearchAuctionsPage = () => {

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
                <h2>Please search our auctions below</h2>
                <p>Not sure how to flesh this out yet, need to know more about the data</p>
            </Box>
        </Container>
    );
};