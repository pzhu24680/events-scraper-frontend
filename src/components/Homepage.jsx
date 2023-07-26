import React from "react";
import { useState, useEffect } from "react";
import '../styles/Homepage.css';
const Homepage = () => {
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };
  const getToken = () => {
    return localStorage.getItem('access_token');
  };
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("https://event-scraper-96da9a7e534d.herokuapp.com/events/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);
  const token=getToken();
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken':getCookie('csrftoken'),
    'Authorization': `Bearer ${token}`
  }
  const handleRegistration = () => {
    fetch("https://event-scraper-96da9a7e534d.herokuapp.com/addnumber/", {
      method: "POST",
      headers: headers,
    });
  };
  const formatDateAndTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };

    const formattedDate = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );

    return formattedDate;
  };
  return (
    <div className="homepage-container">
      <div className="button-container">
        <button onClick={handleRegistration}>
          Register me for daily 9AM CST Text Message Notifications
        </button>
      </div>
      <div className="upcoming-events-header">Upcoming Events</div>
      
      <div>
        {events.map((event) => (
          <div key={event.id} className="event-container">
            <div className="event-name">{event.name}</div>
            <div>{formatDateAndTime(event.datetime)}</div>
            <div>{event.location}</div>
            <div>{event.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
