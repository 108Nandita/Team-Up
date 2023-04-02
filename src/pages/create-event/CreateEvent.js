import React, { useState } from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/nav-bar/NavBar';
import axios from 'axios';
import createevent from "./CreateEvent.css"


function CreateEvent() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [formstate, setFormstate] = useState({
        category: '',
        location: '',
        start: '',
        end: '',
        within: '',
        limit: '',
    });

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormstate((prevFormstate) => ({ ...prevFormstate, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { category, location, start, end, within, limit } = formstate;
        const apikey = 'lhOE6Uv3BMZ_6valBREVlSaF05lYHlljr3DQJIvN';


        if (start && end && start > end) {
            alert('Start date must be before or equal to end date');
            const today = new Date();
            const currentDate = today.toISOString().slice(0, 10);
            setFormstate((prevFormstate) => ({ ...prevFormstate, start: currentDate, end: currentDate }));
            return;        }

        try {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (location) {
                const locationResponse = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`);
                const { lat, lon } = locationResponse.data[0];
                params['location_around.origin'] = `${lat},${lon}`;
            }

            if (start) {
                params.start = start;
            }

            if (end) {
                params.end = end;
            }

            if (within) {
                const locationResponse = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`);
                const { lat, lon } = locationResponse.data[0];
                console.log(locationResponse)
                params.within = `${within}km@${lat},${lon}`;
            }

            if (limit) {
                params.limit = limit;
            }

            const response = await axios.get(`https://api.predicthq.com/v1/events/?category=${category}&location=${location}&start=${start}&end=${end}&within=${within}&limit=${limit}&`, {
                headers: {
                    Authorization: `Bearer ${apikey}`,
                    Accept: 'application/json',
                },
                params,
            });

            const responseData = { data: response.data };
            setData(responseData.data);
            console.log(responseData)
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <NavBar />

            { data.results?.length > 0 ?
                <>
                    <body className="outer-container" >
                    <header className="inner-container1" >


                    </header>

                    <main className="inner-container">
                        <h1>Results:</h1>
                        <button type="button" onClick={() => setData([])}>
                            Back to the form
                        </button>
                        <ul className="result-list">
                            {data.results &&
                                data.results.map((event) => (
                                    <li className="result-view" key={event.id}>
                                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                                            <p className="results">{event.title}</p>
                                        </a>
                                        <p className="results">{event.category}</p>
                                        <p className="results">{event.labels.join(" ")}</p>
                                        <p className="results">{event.start}</p>
                                        <p className="results">{event.end}</p>
                                    </li>
                                ))}
                        </ul>

                    </main>

                    </body>
                </>
             :
                <>
                    <body >
                    <header className="outer-container" >
                        <div className="inner-container1">

                            <Button className="details" isDisabled={false} clickHandler={() =>
                                navigate('/create-event')}>
                                <strong>Create Event</strong>
                            </Button>
                            <Button isDisabled={false} clickHandler={() => navigate('/create-company')}>
                                Create Company
                            </Button>
                            <h1>Search for events:</h1>
                        </div>

                    </header>
                    <br/>
                    <br/>
                    <main className="outer-container" >
                        <form className="inner-container1" onSubmit={handleSubmit}>
                            <label htmlFor="category" style={{ display: "inline-block", width: "140px" }}>Category:</label>
                            <select name="category" id="category" value={formstate.category} onChange=
                                {handleFormChange}>
                                <option value="">--Select a category--</option>
                                <option value="concerts">Concerts</option>
                                <option value="sports">Sports</option>
                                <option value="festivals">Festivals</option>
                                <option value="conferences">Conferences</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="location" style={{ display: "inline-block", width: "140px" }}>Location:</label>
                            <input type="text" name="location" id="location" value={formstate.location} onChange=
                                {handleFormChange} />
                            <br />
                            <br />
                            <label htmlFor="start" style={{ display: "inline-block", width: "140px" }}>Start:</label>
                            <input type="date" name="start" id="start" value={formstate.start} onChange=
                                {handleFormChange} />
                            <br />
                            <br />
                            <label htmlFor="end" style={{ display: "inline-block", width: "140px" }}>End:</label>
                            <input type="date" name="end" id="end" value={formstate.end} onChange=
                                {handleFormChange} />
                            <br />
                            <br />
                            <label htmlFor="within" style={{ display: "inline-block", width: "140px" }}>Within:</label>
                            <select name="within" id="within" value={formstate.within} onChange=
                                {handleFormChange}>
                                <option value="10km">10km</option>
                                <option value="20km">20km</option>
                                <option value="50km">50km</option>
                                <option value="100km">100km</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="limit" style={{ display: "inline-block", width: "140px" }}>Limit:</label> <select name="limit" id="limit" value={formstate.limit} onChange=
                            {handleFormChange}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                            <br />
                            <br />
                            <Button isDisabled={false} clickHandler={handleSubmit}>
                                Search
                            </Button>
                        </form>
                    </main>
                    </body>
                </>
            }
        </>

    );
}

export default CreateEvent;

