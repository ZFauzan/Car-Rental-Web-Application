import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './RentalDetails.css';
import { useContext, useState } from "react";
import { GlobalRentalContext } from "../components/rental-flow";
import { getCarImage } from "../components/CarImages";
import * as moment from 'moment';

export const RentalDetails = () => {

    const context = useContext(GlobalRentalContext);
    const [userInfo, setUserInfo] = useState(context);
    const [pulledInfo, pullInfo] = useState(false);

    React.useEffect(() => {
        //handleChange(pulledInfo);
        if (pulledInfo.branchId > 9 && pulledInfo.customerId > 1) {
            let total_days = moment(pulledInfo.dateDropoff.slice(0, 10)).diff(moment(pulledInfo.datePickup.slice(0, 10)), "days");
            let pre_total = (pulledInfo.priceDaily * total_days).toFixed(2);
            setUserInfo({
                /* branchInfo */
                "branchId": pulledInfo.branchId,
                "branchLocation": pulledInfo.branchName,
                "branchAddress": pulledInfo.street + ", " + pulledInfo.province + " " + pulledInfo.postalCode,
                "branchPhone" : pulledInfo.branchPhone,

                /* car info */
                "carId": pulledInfo.modelId,
                "carImg": 'url(' + getCarImage(pulledInfo.modelId) + ')',
                "carMake": pulledInfo.make,
                "carModel": pulledInfo.model,
                "transmissionType": pulledInfo.transmissionType,
                "seatCapacity": pulledInfo.seatCapacity,
                "priceDaily": parseFloat(pulledInfo.priceDaily),

                /* customer info */
                "customerId": pulledInfo.customerId,
                "firstName": pulledInfo.firstName,
                "lastName": pulledInfo.lastName,
                "birthday": pulledInfo.dateBirth.slice(0,10),
                "license": pulledInfo.licenseNumber,
                "email": pulledInfo.email,
                "phone": pulledInfo.customerPhone,

                /* reservation info */
                "reservationId": pulledInfo.reservationId,
                "reservationDate": pulledInfo.dateReservation.slice(0, 10),
                "pickUpDate": pulledInfo.datePickup.slice(0, 10),
                "dropoffDate": pulledInfo.dateDropoff.slice(0, 10),
                "status": pulledInfo.status,

                /* derived */
                "totalDays": total_days,
                "pretotal": pre_total,
                "taxes": (pre_total * 0.15).toFixed(2),
                "total": (pre_total * 1.15).toFixed(2),
            });
        }
    }, [pulledInfo])

    /** GET RENTAL - get reservation details through the reservationId
     * GUIDE:      get-rental/reservationId
     * EXAMPLE:    get-rental/3919802
     * */
     React.useEffect(() => {
        let url = "/get-rental/" + userInfo.reservationId;
        if (userInfo.reservationId === undefined);
        else if (userInfo.reservationId === "");
        else if (userInfo.reservationId === 0);
        else {
            fetch(url)
                .then((res) => res.json())
                .then((obj) => {
                    console.log("ASUP", obj.rows[0])
                    pullInfo(obj.rows[0])
                });
        }
    }, [userInfo.reservationId]);

    return (
        <div className="rental-details-page">
            <h1>Access Your Rental</h1><br></br>
            <h3>Hi {userInfo.firstName}. Here are the details for your reservation. </h3>
            <div className="rental-info-box" id="clr_bg-box">
                <section className="rental-details-info">
                    <h1 className='header_rental'>Rental Information</h1>
                    <hr></hr>
                    <h2>Selected Vehicle</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td id="car-preview" style={{ backgroundImage: userInfo.carImg }} />
                                <td>{userInfo.carMake} {userInfo.carModel}<br></br>
                                    {userInfo.transmissionType}<br></br>
                                    {userInfo.seatCapacity} people</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <br></br>
                    <h2>Price Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>{userInfo.totalDays} Day(s)</th>
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
                <section className="rental-personal-info">
                    <h1 className='header_rental'>Personal Information</h1>
                    <hr></hr>
                    <table>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{userInfo.firstName}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{userInfo.lastName}</td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>{userInfo.birthday}</td>
                            </tr>
                            <tr>
                                <th>License</th>
                                <td>{userInfo.license}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userInfo.email}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{userInfo.phone}</td>
                            </tr>
                            <tr>
                                <th>Member Id</th>
                                <td>{userInfo.customerId}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="myrental-reservation-info">
                    <h1 className='header_rental'>Reservation Information </h1>
                    <hr></hr>
                    <table>
                        <tbody>
                            <tr>
                                <th>Reservation Number</th>
                                <td>{userInfo.reservationId}</td>
                            </tr>
                            <tr>
                                <th>Reservation Placed On</th>
                                <td>{userInfo.reservationDate}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{userInfo.status}</td>
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
                            <tr>
                                <th></th>
                                <td>{userInfo.branchAddress}</td>
                            </tr>
                            <tr>
                                <th>Contact Branch</th>
                                <td>{userInfo.branchPhone}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            <Link to="/"><Button id="button-" variant="contained" style={{float: 'right'}}>Back To Home</Button></Link>
        </div>
    );
}
