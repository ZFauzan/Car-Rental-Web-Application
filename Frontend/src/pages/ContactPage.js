import * as React from "react";
import { useContext, useState } from "react";
import { GlobalRentalContext } from "../components/rental-flow";
import { Checkbox, TextField } from "@mui/material";
import "./ContactPage.css";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';


export const ContactInformation = ({ updateValues }) => {

    const context = useContext(GlobalRentalContext);
    const [userInfo, setUserInfo] = useState(context)
    const [birthday, setBirthday] = React.useState(dayjs());
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleUpdate = () => {
        updateValues(userInfo);
    }

    const handleChange = (event, field) => {
        switch (field) {
            case "firstName": {
                setUserInfo({ ...userInfo, "firstName": event.target.value });
                break;
            }
            case "lastName": {
                setUserInfo({ ...userInfo, "lastName": event.target.value });
                break;
            }
            case "license": {
                setUserInfo({ ...userInfo, "license": event.target.value });
                break;
            }
            case "email": {
                setUserInfo({ ...userInfo, "email": event.target.value });
                break;
            }
            case "birthday": {
                setBirthday(event);
                setUserInfo({ ...userInfo, "birthday": event.format('YYYY-MM-DD') }); /*change date format here!*/
                break;
            }
            case "phoneNumber": {
                setUserInfo({ ...userInfo, "phoneNumber": event.target.value });
                break;
            }
            default: {
                break;
            }
        }

    };
    return (
        <div className="contact_page">
            <h1>Reserve This Vehicle</h1>
            <div className="info_box_contact">
                <section className="rental-info_contact" id="clr_bg-box">
                    <h1>Rental Information</h1>
                    <hr></hr>
                    <h2>Selected Vehicle</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td id="car-preview" style={{ backgroundImage: userInfo.carImg }} />
                                <td>{userInfo.carMake} {userInfo.carModel}<br></br>
                                    {userInfo.transmissionType}<br></br>
                                    {userInfo.seatCapacity} people
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <h2>Date & Location</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Pickup Date</th>
                                <td>{userInfo.pickUpDate}</td>
                            </tr>
                            <tr>
                                <th>Dropoff Date</th>
                                <td>{userInfo.dropoffDate}</td>
                            </tr>
                            <tr>
                                <th>Branch Location</th>
                                <td>{userInfo.branchLocation}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <h2>Price Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>{userInfo.totalDays} Days</th>
                                <td>${userInfo.pretotal}</td>
                            </tr>
                            <tr>
                                <th>Unlimited Kilometres</th>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <th>Tax & Fees Details</th>
                                <td>${userInfo.taxes}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr></hr>
                    <table>
                        <tbody>
                            <tr>
                                <th>Estimated Total</th>
                                <td>${userInfo.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="personal-info1">
                    <div>
                        <h1 className="personal_header">Personal Information</h1>
                        <hr></hr>
                    </div>
                    <div className="input_boxes">
                        <TextField
                            required
                            id="outlined-required"
                            className="mui_textfield_styled"
                            label="First Name"
                            value={userInfo.firstName}
                            onChange={event => handleChange(event, "firstName")}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            className="mui_textfield_styled"
                            label="Last Name"
                            value={userInfo.lastName}
                            onChange={event => handleChange(event, "lastName")}
                        />
                    </div>

                    <div className="input_boxes">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DesktopDatePicker
                                id="birthday-selector"
                                label="Birthday"
                                inputFormat="MM/DD/YYYY"
                                disableFuture={true}
                                openTo={'year'}
                                value={birthday}
                                onChange={event => handleChange(event, "birthday")}
                                renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>

                        <TextField
                            required
                            id="outlined-required"
                            className="mui_textfield_styled"
                            label="License"
                            value={userInfo.license}
                            onChange={event => handleChange(event, "license")}
                        />
                    </div>
                    <div className="input_boxes">
                        <TextField
                            required
                            id="outlined-required"
                            className="mui_textfield_styled"
                            label="Email"
                            value={userInfo.email}
                            onChange={event => handleChange(event, "email")}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            className="mui_textfield_styled"
                            label="Phone number"
                            value={userInfo.phoneNumber}
                            onChange={event => handleChange(event, "phoneNumber")}
                        />
                    </div>
                    <div className="checkbox_section">
                        <Checkbox className="checkbox"{...label} />
                        <p className="checkbox_text">
                            Sign up for WheelsToGo Email Specials
                            By checking this box you agree to receive our promotional emails.
                            Your email may be used for analytics to generate content tailored
                            to your interests, though you are free to unsubscribe at any time.
                        </p>
                    </div>

                    <div className="checkbox_section">
                        <Checkbox className="checkbox"{...label} />
                        <p className="checkbox_text">
                            By checking this box you agree to our Terms and Conditions.
                        </p>
                    </div>
                    <section>

                    </section>
                </section>
            </div>
            <Link to="/"><Button id="button-back" variant="contained" style={{ float: 'left' }}>Back To Search</Button></Link>
            <Link to="/review"><Button id="button-fwd" variant="contained" onClick={handleUpdate} style={{ float: 'right' }}>Review Reservation</Button></Link>
        </div>
    )
}