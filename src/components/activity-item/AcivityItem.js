import React from 'react';

function ActivityItem({ activity, participants, type, accessibility, price }) {
    return (
        <li>
            <p>{activity.activity}</p>
            <p>Participants: {participants}</p>
            <p>Type: {type}</p>
            <p>Accessibility: {accessibility}</p>
            <p>Price: {price}</p>
        </li>
    );
}

export default ActivityItem;