import Container from "@mui/material/Container";
import * as React from "react";
import Box from "@mui/material/Box";

export const WelcomePage = () => {

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
                <p>Please register for an account or sign to view and place bids.</p>
            </Box>
        </Container>
    );
};