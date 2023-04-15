import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {router} from './App.js'
import {RouterProvider} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#228B22" },
        secondary: {main: '#dcae1a'}
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
