import React from 'react';
import Novi from '../../assets/Novi.png'
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/nav-bar/NavBar";
import Button from "../../components/button/Button";
import Cprofile from "./CompanyProfile.css"

function CompanyProfile() {

    const navigate = useNavigate();


    return (
        <>
            <NavBar/>
            <body>
            <header className="outer-container header-company">
                <div className="profile-container">
                    <h1 ><strong>Profile</strong></h1>
                    <br/>
                    <img className="company-logo" id="company-logo"  src={Novi} alt="Novi"/>
                </div>
            </header>
            <main className="outer-container">
                <div className="inner-container">

                    <section>
                        <Button className="details" isDisabled={false }
                                clickHandler={() => navigate('/company-profile')}>
                            Details
                        </Button>

                        <Button className="event" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                            Event
                        </Button>

                        <Button className="history" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                            History
                        </Button>

                        <Button className="finance" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                            Finance
                        </Button>

                        <Button className="forms" isDisabled={false} clickHandler={() => navigate('/company-profile')}>
                            Forms
                        </Button>
                    </section>
                    <br />
                    <br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="companyName" style={{ display: "inline-block", width: "140px" }}>Company name:</label>
                            <input type="text" name="companyName" id="companyName" value="Hogeschool NOVI B.V." style={{ display: "inline-block" }}/>
                        </div>
                        <br/>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="city" style={{ display: "inline-block", width: "140px" }}>City:</label>
                            <input type="text" name="city" id="city" value="Utrecht" style={{ display: "inline-block" }}/>
                        </div>

                        <br/>
                        <br/>

                        <div className="form-group">
                            <label htmlFor="address" style={{ display: "inline-block", width: "140px" }}>Address:  </label>
                            <input type="text" name="city" id="city" value=" Newtonlaan 247" style={{ display: "inline-block" }}/>
                        </div>

                        <br/>
                        <br/>

                        <div className="form-group">
                            <label htmlFor="postal-code" style={{ display: "inline-block", width: "140px" }}>Postal Code:  </label>
                            <input type="text" name="postal-code" id="postal-code" value="3584 BH" style={{ display: "inline-block" }}/>
                        </div>

                        <br/>
                        <br/>

                        <div className="form-group">
                            <label htmlFor="phone-number" style={{ display: "inline-block", width: "140px" }}>Phone Number:  </label>
                            <input type="text" name="phone-number" id="phone-number" value="030 307 3200" style={{ display: "inline-block" }}/>
                        </div>

                        <br/>
                        <br/>

                        <div className="form-group">
                            <label htmlFor="contact-person" style={{ display: "inline-block", width: "140px" }}>Contact Person:  </label>
                            <input type="text" name="city" id="city" value="Sammetje Barnhoorn" style={{ display: "inline-block" }}/>
                        </div>
                    </form>
                    <br/>
                    <br/>
                </div>

            </main>
            </body>
        </>
    )};



export default CompanyProfile;

