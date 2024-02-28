import React, {useState} from 'react';
import { useContext } from "react";
import { GlobalRentalContext } from "../components/rental-flow";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';
import './ReviewPage.css';

export const ReviewPage = () => {
    const context = useContext(GlobalRentalContext);
    const rentalInfo = context;

    const [pressConfirm, setPressConfirm] = useState(false);
    const handleUpdate = () => {
        setPressConfirm(true);
    };

    /** POST CUSTOMER- Post customer info to db upon pressing 'confirm' button
     * GUIDE:      postCustomerInfo/customerId/fn/ln/dob/license/email/phoneNumber/emailSubscribeStatus
     * EXAMPLE:    postCustomerInfo/69696969/Jane/Doe/1969-07-01/664/jd@email.ca/6663471995/false
     * */
    React.useEffect(() => {
        let url = "/postCustomerInfo/" + rentalInfo.customerId + "/" + rentalInfo.firstName + "/" + rentalInfo.lastName + "/" + rentalInfo.birthday + "/" + rentalInfo.license + "/" + rentalInfo.email + "/" + rentalInfo.phoneNumber + "/false" ;
        fetch(url)
            .then((res) => res.json());
    }, [pressConfirm, rentalInfo]);
 
    /** POST RENTAL- Post reservation info to db upon pressing 'Confirm' button
     * GUIDE:      postRentalInfo/reservationId/branchId/customerId/modelId/datePickup/dateDropoff/dateReservation
     * EXAMPLE:    postRentalInfo/69/00/000/000/2023-11-30/2023-12-01/2022-11-22
     * */
    React.useEffect(() => {
        let url = "/postRentalInfo/" + rentalInfo.reservationId + "/" + rentalInfo.branchId + "/" + rentalInfo.customerId + "/" + rentalInfo.carId + "/" + rentalInfo.pickUpDate + "/" + rentalInfo.dropoffDate + "/" + rentalInfo.reservationDate ;
        fetch(url)
            .then((res) => res.json());
    }, [pressConfirm, rentalInfo]);

    return (
        <div className="review-page-full">
        <div className="review-page">
            <aside>
                <h1>Reserve This Vehicle</h1>
                <h3>Please review the following information:</h3>
                <Alert id="alert" severity="info" color="error">
                    <AlertTitle id="alert-title">Payment Instructions</AlertTitle>
                    Please arrive at the branch location <strong>30 minutes early</strong> to provide your documents and payment method.
                </Alert>
            </aside>
            <div className="info-box" id="clr_bg-box">
                <section className="rental-info">
                    <h1>Rental Information</h1>
                    <hr></hr>
                    <h2>Selected Vehicle</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td id="car-preview" style={{ backgroundImage: rentalInfo.carImg }} />
                                <td>{rentalInfo.carMake} {rentalInfo.carModel}<br></br>
                                    {rentalInfo.transmissionType}<br></br>
                                    {rentalInfo.seatCapacity} people</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <h2>Date & Location</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Pickup Date</th>
                                <td>{rentalInfo.pickUpDate}</td>
                            </tr>
                            <tr>
                                <th>Dropoff Date</th>
                                <td>{rentalInfo.dropoffDate}</td>
                            </tr>
                            <tr>
                                <th>Branch Location</th>
                                <td>{rentalInfo.branchLocation}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <h2>Price Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>{rentalInfo.totalDays} Days</th>
                                <td>${rentalInfo.pretotal}</td>
                            </tr>
                            <tr>
                                <th>Unlimited Kilometres</th>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <th>Tax & Fees Details</th>
                                <td>${rentalInfo.taxes}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr></hr>
                    <table>
                        <tbody>
                            <tr>
                                <th>Estimated Total</th>
                                <td>${rentalInfo.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="personal-info">
                    <h1>Personal Information</h1>
                    <hr></hr>
                    <table>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{rentalInfo.firstName}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{rentalInfo.lastName}</td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>{rentalInfo.birthday}</td>
                            </tr>
                            <tr>
                                <th>License</th>
                                <td>{rentalInfo.license}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{rentalInfo.email}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{rentalInfo.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            </div>
            <Link to="/contact"><Button id="button-back" variant="contained" style={{ float: 'left' }}>Back To Personal Info</Button></Link>
            <Link to="/confirm"><Button id="button-fwd" variant="contained" onClick={event => handleUpdate()} style={{ float: 'right' }} >Confirm Reservation</Button></Link>
        </div>
    );
}