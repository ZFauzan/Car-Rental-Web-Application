import { useRef } from "react";
import { Link } from "react-router-dom";

import './CareersPage.css';

export function CareersPage() {
    const ref = useRef(null);

    const scrollOnClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="careers">

            <div className="banner-image">
                <section>
                    <h1>Let's work together.</h1>
                    <h3>Start your <Link onClick={scrollOnClick}>career at WheelsToGo[↗]</Link>.</h3>
                    <img alt="Logo" src="Logo.png"></img>
                </section>

            </div>
            <div className="careers-tab" ref={ref}>
                <h1>Careers at WheelsToGo</h1>
                <div className="carrow">
                    <div className="carcol">
                        <h3>Whether you are joining the workforce for the first time, or you are thinking changing career paths,
                            WheelsToGo is the perfect place to take the next step in your professional life. As a leading competitor
                            in the online rental space, WheelsToGo offers rich opportunities to further skill development while taking
                            strides to advance a fast-growing industry. We prides ourselves in our welcoming and forward-thinking
                            community, and would love to have you on one of our extraordinary teams!</h3>
                    </div>
                    <div className="carcol-2">
                    </div>
                </div>
                <h1>Interested in working with us?</h1>
                <h3>Browse our current job openings below:</h3>
                <div className="hmm" id="clr_bg-box">
                    <h3>Hm... There are <b>no</b> available positions at this time.<br />Check back soon to view new openings!</h3>
                </div>
                <h3 style={{ paddingTop: "5%", alignSelf: "flex-end" }}>Questions regarding postings can be directed <Link to="/help">here</Link>.</h3>
            </div>

        </div>
    );
}