import './App.css';
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import React from 'react';

import { LandingPage } from './pages/LandingPage'
import { ContactInformation } from './pages/ContactPage'
import { ReviewPage } from './pages/ReviewPage'
import { ConfirmPage } from './pages/ConfirmPage'
import { RentalDetails } from './pages/RentalDetails'
import { AccessRental } from './pages/AccessRental'
import { CareersPage } from './pages/CareersPage';
import { HelpPage } from './pages/HelpPage';

import { GlobalRentalContext, rentalInfo} from "./components/rental-flow";
import { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    const [globalState, setGlobalState] = useState(rentalInfo);

    const updateGlobalState = (obj) => {
        console.log("hello", obj)
        setGlobalState({ ...globalState, ...obj })
    }

    // todo: remove asap
    useEffect(() => {
        console.log(globalState)
    }, [globalState])

    return (
        <div className="App">
            <Router>
            <Header />
                <Switch>
                    <Route exact path="/">
                        <GlobalRentalContext.Provider value={globalState}>
                            <LandingPage updateValues={updateGlobalState} />
                        </GlobalRentalContext.Provider>
                    </Route>
                    <Route exact path="/contact">
                        <GlobalRentalContext.Provider value={globalState}>
                            <ContactInformation updateValues={updateGlobalState} />
                        </GlobalRentalContext.Provider>
                    </Route>
                    <Route exact path="/review">
                        <GlobalRentalContext.Provider value={globalState}>
                            <ReviewPage />
                        </GlobalRentalContext.Provider>
                    </Route>
                    <Route exact path="/confirm">
                        <GlobalRentalContext.Provider value={globalState}>
                            <ConfirmPage />
                        </GlobalRentalContext.Provider>
                    </Route>
                    <Route exact path="/view_rental_details">
                        <GlobalRentalContext.Provider value={globalState}>
                            <RentalDetails />
                        </GlobalRentalContext.Provider>
                    </Route>
                    <Route exact path="/manage_rental_details">
                        <GlobalRentalContext.Provider value={globalState}>
                            <AccessRental updateValues={updateGlobalState}/>
                        </GlobalRentalContext.Provider>
                    </Route>
                    <Route exact path="/careers">
                        <CareersPage />
                    </Route>
                    <Route exact path="/help">
                        <HelpPage />
                    </Route>
                </Switch>
            </Router>
            <Footer />

        </div>
    );
}

export default App;