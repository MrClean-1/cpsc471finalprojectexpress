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
// need a function that takes a username and a password (hash) and returns True/False
// true if the user/hash matches one in the DB
// false if the user has failed to match any known credentials

export const LoginPage = () => {
    const { login } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login({
            username: data.get("username"),
            password: data.get("password")
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
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
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
                        Login
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/register">
                                <Link href="client/src/index#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
