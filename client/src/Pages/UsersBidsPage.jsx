import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";

//TODO
// For this I will give you the username of the user
// I need a method that will return the users bids, ideally this is a list
// That list will need like, the user's bid price and the ID of the auction that it is tied to.
// Or a function that gives me a list of bids for a user, and another function that gives me bid data from an ID

export const UsersBidsPage = () => {

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
                <h2>Your bids are located here, click on a bid to view that auction</h2>
            </Box>
        </Container>
    );
};