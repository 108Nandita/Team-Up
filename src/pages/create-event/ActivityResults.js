import React, { useEffect, useState } from 'react';
import NavBar from '../../components/nav-bar/NavBar';
import createEvent from './CreateEvent'
import {useParams} from "react-router-dom";


function ActivityResults(props) {
    const [activities, setActivities] = useState([]);
    const {test} = useParams()
    console.log(test)

    // useEffect(() => {
    //     fetchActivities();
    // }, []);
    //
    // const fetchActivities = () => {
    //     const apiUrl = `https://www.boredapi.com/api/activity?${new URLSearchParams({
    //         participants: props.participants,
    //         type: props.type,
    //         accessibility: props.accessibility,
    //         maxPrice: props.maxPrice
    //     })}`;
    //
    //
    //     fetch(apiUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setActivities(Array.isArray(data) && data.length > 0 ? data.slice(0, 5) : []);
    //         })
    //         .catch((error) => console.error(error));
    // };

    return (
        <>
            <NavBar />
            <div className="activity-results">
                <h1>Activity Results</h1>
                <p>Criteria:</p>
                <ul>
                    <li>Participants: {props.participants}</li>
                    <li>Type: {props.type}</li>
                    <li>Accessibility: {props.accessibility}</li>
                    <li>Max Price: {props.maxPrice}</li>
                </ul>
                <p>Results:</p>
                {activities.length ? (
                    <ul>
                        {activities.map((activity) => (
                            <li key={activity.id} activity={activities} />
                        ))}
                    </ul>
                ) : (
                    <p>No activities found.</p>
                )}
            </div>
        </>
    );
}

export default ActivityResults;