import React from 'react'
import teambuilding from '../../assets/TeamBuilding.png'
import NavBar from '../../components/nav-bar/NavBar'
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import HomeButton from "./Home.css"


function Home() {

    const navigate = useNavigate();


    return (
        <>
            <NavBar/>
            <body className="outer-container" >
            <header className="inner-container" >
                <div>
                    <img className="home-image"  src={teambuilding} alt="Team Building"/>
                </div>
            </header>
            <main className="inner-container">
                <div>

                    <section>
                        <Button className="home-button" isDisabled={false} clickHandler={() => navigate('/home')}>
                            Event
                        </Button>
                    </section>

                    <section>
                        <Button className="home-button" isDisabled={false}
                                clickHandler={() => navigate('/company-profile')}>
                            Company
                        </Button>
                    </section>

                    <section>
                        <Button className="home-button" isDisabled={false}
                                clickHandler={() => navigate('/create-event')}>
                            Create
                        </Button>
                    </section>

                    <section>
                        <Button className="home-button" isDisabled={false} clickHandler={() => navigate('/home 1')}>
                            Share
                        </Button>
                    </section>

                    <section>
                        <Button className="home-button" isDisabled={false} clickHandler={() => navigate('/home')}>
                            Forms
                        </Button>
                    </section>

                    <section>
                        <Button className="home-button" isDisabled={false} clickHandler={() => navigate('/home')}>
                            Statistics
                        </Button>
                    </section>

                </div>
            </main>
            </body>
        </>
    );
}

export default Home;

