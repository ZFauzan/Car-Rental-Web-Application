
import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { GlobalRentalContext } from "../components/rental-flow";
import { getCarImage } from "../components/CarImages";
import { SearchBar } from "../components/SearchBar";

import { Button, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import dayjs from 'dayjs';

import './LandingPage.css';

export const LandingPage = ({ updateValues }) => {

    const context = useContext(GlobalRentalContext);
    const [carInfo, setCarInfo] = useState(context);
    const sortByList = ["Recommended", "Make", "Seatcount", "Price"]
    const [sortType, setSortType] = React.useState(sortByList[0]);
    const [carData, setCarData] = React.useState(false);
    const resultCount = carData.length;
    const ref = useRef(null);

    const updateBranchInfo = (branchData) => {
        setCarInfo({ ...carInfo, ...branchData })
    }

    const handleUpdate = () => {
        updateValues(carInfo);
    };

    const handleChange = (event, field) => {
        switch (field) {
            case "scroll": {
                ref.current?.scrollIntoView({behavior: 'smooth'});
                break;
            }
            case "sortBy": {
                setSortType(event.target.value);
                setCarInfo({ ...carInfo, "sortType": event.target.value });
                break;
            }
            case "car": {
                setCarInfo({
                    ...carInfo,
                    /* from table row */
                    "carId": event.modelId,
                    "carImg": 'url('+getCarImage(event.modelId)+')',
                    "carMake": event.make,
                    "carModel": event.model,
                    "transmissionType": event.transmissionType,
                    "seatCapacity": event.seatCapacity,
                    "priceDaily": parseFloat(event.priceDaily),

                    /* derived */
                    "pretotal": (carInfo.priceDaily * carInfo.totalDays).toFixed(2),
                    "taxes": (carInfo.pretotal * 0.15).toFixed(2),
                    "total": (carInfo.pretotal * 1.15).toFixed(2),

                    /* other */
                    "reservationDate": dayjs().format('YYYY-MM-DD'),
                    "reservationId": Math.floor(Math.random() * (10000000 - 1000000) + 1000000),
                    "customerId": Math.floor(Math.random() * (10000000 - 1000000) + 1000000)
                });
                break;
            }
            default: {
                break;
            }
        }
    };

    /** GET CARS - get all the cars that are available at the specified branch and order them as specified (by sortType)
     * GUIDE:      get-cars/branchId/sortType
     * EXAMPLE:    get-cars/10/Price
     * */
    React.useEffect(() => {
        if(carInfo.branchId === undefined); 
        else {
            if(carInfo.branchId > 9) {
        let url = "/get-cars/" + carInfo.branchId + "/" + carInfo.sortType;
        fetch(url)
            .then((res) => res.json())
            .then((carData) => setCarData(carData.rows));
        }}
    }, [carInfo.branchId, carInfo.sortType]);
    
    return (
        <div className="landing">
            <div className="banner-image">
                <section>
                <h1>Need a car? No problem!</h1>
                <h3>WheelsToGo has <b>over 100</b> quality cars for you.</h3>
                <Button id="button-banner" variant="contained" onClick={event => handleChange(null, "scroll")}>Explore Now</Button>
                </section>
            </div>
        <div className="landing-page" ref={ref}>
            
            <SearchBar updateValues={updateBranchInfo}></SearchBar>
            <div className="results-header-bar">

                <h1>Select A Vehicle</h1>
                <p>{resultCount} Results</p>

                <div className="sortByDrop">
                    <FormControl sx={{ width: '10vw' }}>
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                        <Select value={sortType} label="Sort By"
                            onChange={event => handleChange(event, "sortBy")}
                        >
                            {sortByList.map((sortByList) => (
                                <MenuItem key={sortByList} value={sortByList}>
                                    {sortByList}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="line" />

            <div className="carTable">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 150 }} aria-label="simple table">
                        <TableBody>
                            {!carData ? <TableRow/> : carData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ border: 0 }}
                                    onMouseOver={event => handleChange(row, "car")}
                                >
                                    <TableCell align="left" width="15%" style={{ paddingLeft: '5%' }}>
                                        <img alt="car-preview" width="100%" src={getCarImage(row.modelId)} />
                                        </TableCell>
                                    <TableCell align="center" id="carTable-bigtext">{row.make} {row.model}</TableCell>
                                    <TableCell align="center">{row.transmissionType}<br />{row.seatCapacity.toString()} people</TableCell>
                                    <TableCell align="center"><span id="carTable-bigtext">${row.priceDaily.toString()}</span>/day</TableCell>
                                    <TableCell align="center" width="15%">
                                        <Link to="/contact" style={{ textDecoration: 'none' }}><Button id="button-" variant="contained" size="large" onClick={event => handleUpdate()}>Rent</Button></Link>
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div></div>
    )

}


