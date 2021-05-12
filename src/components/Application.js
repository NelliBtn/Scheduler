import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Laura Palmer",
      interviewer: {
        id: 1,
        name: "Dr. Cooper",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Drako Malfoy",
      interviewer: {
        id: 1,
        name: "Severus Snape",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

const appointmentsParsed = appointments.map(appointment => { 
  return <Appointment key={appointment.id} {...appointment}/>
})


export default function Application(props) {

  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    const url = `/api/days`
    axios.get(url)
    .then(response => {
      console.log(response)
      setDays([...response.data])
    })
  }, []) // runs only once after initial render
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          {appointmentsParsed}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
