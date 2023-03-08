import React, { useEffect, useState } from 'react';
import NavBar from '../../components/nav-bar/NavBar';
import CreatEvent from  './CreateEvent'

function ActivityResults(props) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = () => {
        const apiUrl = `https://www.boredapi.com/api/activity?${new URLSearchParams({
            type: props.type,
            participants: props.participants,
            price: props.price,
            accessibility: props.accessibility,
            participants: props.participants,
            maxprice: props.maxprice
        })}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setActivities(data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <NavBar />
            <div className="activity-results">
                <h1>Activity Results</h1>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>{activity.activity}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ActivityResults;

