import React, {Component} from 'react';
import './Header.css';
import {Link} from "react-router-dom";


export class Header extends Component {
    render(){
        return(
            <div className="header" id="clr-header">
                <Link to="/"><img className="logo-img" alt="Logo" src="Logo.png"></img></Link>  
                <Link to="/" className="link">Rent</Link> 
                <Link to="/manage_rental_details" className="link">Access Rental</Link>
                <Link to="/careers" className="link">Careers</Link>
                <div className="link-help"><Link to= "/help" className="link">Help</Link></div>
            </div>
        )
    }
}