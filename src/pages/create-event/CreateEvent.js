import React, {useState} from 'react';
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/nav-bar/NavBar";

function CreateEvent() {

    const navigate = useNavigate();

    const [formstate, setFormstate] = useState({
        companyName: "",
        city: "",
        amountParticipants: 0,
        typeActivity: "",
        accessibility: "",
        dayPart: "",
        maxPrice: 0,
    });

    const [activities, setActivities] = useState([]);

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        let newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        if (changedFieldName === "amountParticipants") {
            newValue = isNaN(newValue) ? 0 : Math.min(Math.max(parseInt(newValue), 0), 20);
        }

        setFormstate({
            ...formstate,
            [changedFieldName]: newValue,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { amountParticipants, typeActivity, accessibility, maxPrice} = formstate;

        // Call API with form inputs and store results in state
        const apiUrl = "https://www.boredapi.com/api/activity";
        const queryParams = new URLSearchParams({
            type: formstate.typeActivity,
            participants: formstate.amountParticipants,
            price: formstate.maxPrice,
            accessibility: formstate.accessibility
        });
        const response = await fetch(`${apiUrl}?${queryParams}`);
        const data = await response.json();
        console.log(data);

        try {
            const response = await fetch(`${apiUrl}?${queryParams}`);
            const data = await response.json();
            console.log(data);
            setActivities(data.activities);
            navigate('/activity-results', {
                state: {
                    type: typeActivity,
                    participants: amountParticipants,
                    price: 0,
                    accessibility: accessibility,
                    maxprice: maxPrice
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBar/>

            <header className="outer-container">

                <div className="inner-container1">
                    <br/>
                    <br/>
                    <Button className="details" isDisabled={false} clickHandler={() => navigate('/create-event')}>
                        <strong>Create Event</strong>
                    </Button>
                    <Button isDisabled={false} clickHandler={() => navigate('/create-company')}>
                        Create Company
                    </Button>
                </div>
            </header>
            <main className="outer-container">

                <form className="inner-container1" onSubmit={handleSubmit}>
                    <br/>
                    <br/>
                    <label htmlFor="companyName" style={{display: "inline-block", width: "140px"}}>Company name:</label>
                    <input type="text" name="companyName" id="companyName" value={formstate.companyName}
                           onChange={handleFormChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="city" style={{display: "inline-block", width: "140px"}}>City:</label>
                    <input type="text" name="city" id="city" value={formstate.city} onChange={handleFormChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="amountParticipants" style={{display: "inline-block", width: "140px"}}>Amount of
                        participants:</label>
                    <input type="number" name="amountParticipants" id="amountParticipants"
                           value={formstate.amountParticipants} onChange={handleFormChange}/>
                    <br/>
                    <br/>
                    <label htmlFor="typeActivity" style={{display: "inline-block", width: "140px"}}>Type of
                        activity:</label>
                    <select name="typeActivity" id="typeActivity" value={formstate.typeActivity}
                            onChange={handleFormChange}>
                        <option value="option1">education</option>
                        <option value="option2">recreational</option>
                        <option value="option3">social</option>
                        <option value="option4">diy</option>
                        <option value="option5">charity</option>
                        <option value="option6">cooking</option>
                        <option value="option7">relaxation</option>
                        <option value="option8">music</option>
                        <option value="option9">busywork</option>
                    </select>

                    <br/>
                    <br/>

                    <label htmlFor="accessibility"
                           style={{display: "inline-block", width: "140px"}}>Accessability:</label>
                    <input type="number" name="accessibility" id="accessibility" min="0" max="1" step="0.05"
                           value={formstate.accessibility} onChange={handleFormChange}/>

                    <br/>
                    <br/>

                    <label htmlFor="dayPart" style={{display: "inline-block", width: "140px"}}>Day part:</label>
                    <select name="dayPart" id="dayPart" value={formstate.dayPart} onChange={handleFormChange}>
                        <option value="">Select an option</option>
                        <option value="morning">1 part</option>
                        <option value="afternoon">2 day parts</option>
                    </select>

                    <br/>
                    <br/>

                    <label htmlFor="maxPrice" style={{display: "inline-block", width: "140px"}}>Maximum price:</label>
                    <input type="number" name="maxPrice" id="maxPrice" min="0" max="1" step="0.05"
                           value={formstate.maxPrice} onChange={handleFormChange}/>

                    <br/>
                    <br/>

                    <Button isDisabled={false} clickHandler={() => {
                    }}>
                        Search
                    </Button>
                </form>

            </main>

        </>
    );
}

export default CreateEvent;

