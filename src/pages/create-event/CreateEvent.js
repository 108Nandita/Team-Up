import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/nav-bar/NavBar';
import Button from '../../components/button/Button';
import Input from "../../components/input/Input"
import axios from 'axios';
import { API_KEY } from '../../key';
import createEvent from './CreateEvent.css';

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
    const [error, setError] = useState('');

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormstate((prevFormstate) => ({ ...prevFormstate, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { category, location, start, end, within, limit } = formstate;

        if (start && end && start > end) {
            alert('Start date must be before or equal to end date');
            const today = new Date();
            const currentDate = today.toISOString().slice(0, 10);
            setFormstate((prevFormstate) => ({ ...prevFormstate, start: currentDate, end: currentDate }));
            return;
        }

        if (!category || !location || !start || !end) {
            alert('Vul alle dikgedrukte velden in, deze zijn vereist om een zoekopdracht uit te voeren');
            return;
        }

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
                console.log(locationResponse);
                params.within = `${within}km@${lat},${lon}`;
            }

            if (limit) {
                params.limit = limit;
            }

            const response = await axios.get(`https://api.predicthq.com/v1/events/?category=${category}&location=${location}&start=${start}&end=${end}&within=${within}&limit=${limit}&`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    Accept: 'application/json',
                },
                params,
            });

            const responseData = { data: response.data };
            setData(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.error('Fout tijdens het ophalen van evenementen:', error);
            setError('Fout tijdens het ophalen van evenementen. Probeer het later opnieuw.');
        }
    }

    return (
        <>
            <NavBar />

            {data.results?.length > 0 ? (
                <div className="outer-container">
                    <header className="inner-container1"></header>
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
                                        <p className="results">{event.labels.join(' ')}</p>
                                        <p className="results">{event.start}</p>
                                        <p className="results">{event.end}</p>
                                    </li>
                                ))}
                        </ul>
                    </main>
                </div>
            ) : (
                <div>
                    <header className="outer-container">
                        <div className="inner-container1">
                            {/* ... bestaande code ... */}
                        </div>
                    </header>
                    <br />
                    <br />
                    <main className="outer-container">
                        <form className="inner-container1" onSubmit={handleSubmit}>
                            {error && <p>{error}</p>}
                            <Input
                                label="Category"
                                name="category"
                                type="text"
                                value={formstate.category}
                                onChange={handleFormChange}
                            />
                            <br />
                            <br />
                            <Input
                                label="Location"
                                name="location"
                                type="text"
                                value={formstate.location}
                                onChange={handleFormChange}
                            />
                            <br />
                            <br />
                            <Input
                                label="Start"
                                name="start"
                                type="date"
                                value={formstate.start}
                                onChange={handleFormChange}
                            />
                            <br />
                            <br />
                            <Input
                                label="End"
                                name="end"
                                type="date"
                                value={formstate.end}
                                onChange={handleFormChange}
                            />
                            <br />
                            <br />
                            <label htmlFor="within" style={{ display: 'inline-block', width: '140px' }}>
                                Within:
                            </label>
                            <select name="within" id="within" value={formstate.within} onChange={handleFormChange}>
                                <option value="10km">10km</option>
                                <option value="20km">20km</option>
                                <option value="50km">50km</option>
                                <option value="100km">100km</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="limit" style={{ display: 'inline-block', width: '140px' }}>
                                Limit:
                            </label>
                            <select name="limit" id="limit" value={formstate.limit} onChange={handleFormChange}>
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
                </div>
            )}
        </>
    );
}

export default CreateEvent;