import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

//TODO
// update the values in this form to match the ones we set in the diagram
// Need a method that adds a new user to the DB
// I will pass all the details that are shown in the diagram

export const RegisterPage = () => {
    const { register } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        register({
            username: data.get("username"),
            password: data.get("password"),
            fName: data.get("fName"),
            lName: data.get("lName"),
            address: data.get("address"),
            cardNumber: data.get("cardNumber")
        });
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="fName"
                        label="First Name"
                        type="fName"
                        id="fName"
                        autoComplete="first-name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lName"
                        label="Last Name"
                        type="lName"
                        id="lName"
                        autoComplete="last-name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        type="address"
                        id="address"
                        autoComplete="address"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="cardNumber"
                        label="Card number"
                        type="cardNumber"
                        id="cardNumber"
                        autoComplete="card-number"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/login">
                                <Link href="client/src/index#" variant="body2">
                                    {"Already have an account? Log In"}
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
