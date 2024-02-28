import { GlobalRentalContext } from "./rental-flow";
import React, { useContext, useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import {TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';

export const SearchBar = ({updateValues}) => {
    const context = useContext(GlobalRentalContext);
    const [carInfo, setCarInfo] = useState(context);
    
    const [location, setLocation] = React.useState('');
    const [pickUpDate, setPickUpDate] = React.useState('');
    const [dropoffDate, setDropoffDate] = React.useState('');

    // get branches
    const [branchData, setBranchData] = React.useState(false);
    React.useEffect(() => {
        fetch("/get-branches")
            .then((res) => res.json())
            .then((branchData) => setBranchData(branchData.rows));
    }, []);

    function getBranchId(branchName) {
        for (let i = 0; i < branchData.length; i++) {
            if (branchData[i].branchName === branchName) return branchData[i].branchId;
        }
        return -1;
    }

    const handleChange = (event, field) => {
        switch (field) {
            case "branchLocation": {
                setLocation(event.target.value);
                setCarInfo({ ...carInfo, 
                    "branchLocation": event.target.value,
                    "branchId": getBranchId(event.target.value)
                 });
                break;
            }
            case "pickUpDate": {
                setPickUpDate(event);
                setCarInfo({ ...carInfo, "pickUpDate": event.format('YYYY-MM-DD') }); /*change date format here!*/
                break;
            }
            case "dropoffDate": {
                setDropoffDate(event);
                setCarInfo({...carInfo,
                    "dropoffDate": event.format('YYYY-MM-DD'), /*change date format here!*/
                    "totalDays": event.diff(pickUpDate, 'd') + 1,
                });
                break;
            }
            case "searchButton": {
                updateValues(carInfo);
                break;
            }
            default: 
                break;
        }
    };

    return (
        <div className="search-bar">
                <PinDropIcon className="icons" />
                <FormControl className='location' sx={{ minWidth: "25%" }}>
                    <InputLabel>Location</InputLabel>
                    <Select value={location} label="Location" onChange={event => handleChange(event, "branchLocation")}>
                        {!branchData ? "Loading..." : branchData.map((branch, index) => (
                            <MenuItem key={index} value={branch.branchName}>
                                {branch.city}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

                <CalendarMonthIcon className="icons" />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DesktopDatePicker
                        label="Pickup Date"
                        inputFormat="MM/DD/YYYY"
                        disablePast={true}
                        value={pickUpDate}
                        onChange={event => handleChange(event, "pickUpDate")}
                        renderInput={(params) => <TextField {...params} sx={{ width: '20%' }} />} />
                </LocalizationProvider>

                <CalendarMonthIcon className="icons" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Drop-off Date"
                        inputFormat="MM/DD/YYYY"
                        minDate={new Date(pickUpDate)}
                        value={dropoffDate}
                        onChange={event => handleChange(event, "dropoffDate")}
                        renderInput={(params) => <TextField {...params} sx={{ width: '20%' }} />} />
                </LocalizationProvider>

                <Button id="button-fwd" variant="contained" onClick={event => handleChange(event, "searchButton")}>Search</Button>
        </div>
    )
}