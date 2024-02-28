import * as React from 'react';
import './AccessRental.css';
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalRentalContext } from "../components/rental-flow";

export function AccessRental({ updateValues }) {

    const context = useContext(GlobalRentalContext);
    const [userInfo, setUserInfo] = useState(context);

    const handleUpdate = () => {
        updateValues(userInfo);
    }

    const handleChange = (event, field) => {
        //console.log(userInfo);
        switch (field) {
            case "reservationId": {
                setUserInfo({ ...userInfo, "reservationId": event.target.value });
                break;
            }
            case "lastName": {
                setUserInfo({ ...userInfo, "lastName": event.target.value });
                break;
            }
            default: {
                break;
            }
        }

    };

    return (
        <div className="access_rental">
            <div className="banner-image" />
            <div className="access-rental-box">
                <h1>Access Your Rental</h1>
                <h3>Provide the following information<br />to view your reservation details:</h3>
                <div className="input_box">
                    <TextField
                        required
                        id="outlined-required"
                        className="mui_textfield_styled"
                        label="Last Name"
                        onChange={event => handleChange(event, "lastName")}
                    />
                </div>
                <div className="input_box">
                    <TextField
                        required
                        id="outlined-required"
                        className="mui_textfield_styled"
                        label="Reservation Number"
                        onChange={event => handleChange(event, "reservationId")}
                    />
                </div>
                <br></br>
                <Link to="/view_rental_details" style={{ textDecoration: 'none' }}><Button id="button-" onClick={handleUpdate} variant="contained" size="large">Search</Button></Link>
            </div>
        </div>

    )
}