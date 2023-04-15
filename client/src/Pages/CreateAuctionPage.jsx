import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";

//TODO
// Need the required function that creates a new auction.
// You can decide what values you need to do this, and I will provide them.
// Maybe this method should return true/false if the creation of a new auction worked

export const CreateAuctionPage = () => {

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
                <h2>Create an auction</h2>
                <p>I need a form that goes here</p>
            </Box>
        </Container>
    );
};