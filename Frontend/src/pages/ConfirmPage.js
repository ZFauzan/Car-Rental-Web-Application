import React from 'react';
import { useContext } from "react";
import { GlobalRentalContext } from "../components/rental-flow";
import Button from '@mui/material/Button';
import './ConfirmPage.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const ConfirmPage = () => {
    const context = useContext(GlobalRentalContext);
    const rentalInfo = context;
    return (
        <div className="confirm-page">
            <div className="confirm-box">
                <h1><CheckCircleOutlineIcon color="success" /> You're all set!</h1>
                <h3>You will be receiving a confirmation email shortly.</h3>
                <h3>Your reservation number is <b>{rentalInfo.reservationId}</b>.</h3>
                <img alt="logo" src='Logo_dark.png' className="image_confirm"></img>
            </div>
            <Button id="button-fwd" variant="contained" onClick={() => window.open("/", "_self")}>Return to Home</Button>
        </div>
    );
}