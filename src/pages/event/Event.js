import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import NavBar from '../../components/nav-bar/NavBar';
import EventStyle from "./Event.css";

function MyCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedEvents = localStorage.getItem('calendarEvents');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Enter a title for your event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            };

            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
            localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

            console.log(updatedEvents);
        }
    };

    const handleEventClick = (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();

            const updatedEvents = events.filter((event) => event !== clickInfo.event);
            setEvents(updatedEvents);
            localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));


        }
    };

    const eventContent = ({ event }) => {
        console.log(event);
        return (
            <div>
                {event.title}
            </div>
        );
    };

    return (
        <>
            <NavBar />
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
                dateClick={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={eventContent}
                editable={true}
            />
        </>
    );
}

export default MyCalendar;