import React, {Component} from 'react';
import './Header.css';
export class Header extends Component {
    render(){
        return(
            <div class="header">
                <a class="logo"><img src="Logo.png"></img></a>
                <a class="logoIcon"><img src="LogoIcon.png"></img></a>
                <a class="header-left">Rent</a>
                <a class="header-left">Access rental</a>
                <a class="header-left">Careers</a>
                <div class="header-right">
                    <a>Help</a>
                </div>
            </div>
        )
    }
}