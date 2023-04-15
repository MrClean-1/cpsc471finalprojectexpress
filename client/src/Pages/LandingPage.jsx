import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import * as React from "react";

export const LandingPage = () => {

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
                <h2>Welcome to the Auction House</h2>
                <p>From here you should take a look at our auctions and place some bids!</p>
            </Box>
        </Container>
    );
};