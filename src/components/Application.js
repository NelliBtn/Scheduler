import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: [],
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: 1
        }
      }
    ]
  });
  
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  
  
  useEffect(() => {
    const daysUrl = `/api/days`;
    const apptUrl = `/api/appointments`;
    const intUrl = `/api/interviewers`;
    
    Promise.all([
      axios.get(daysUrl),
      axios.get(apptUrl),
      axios.get(intUrl)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])
  
  const interviewersArray = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsParsed = dailyAppointments.map(appointment => {
    console.log('Interviewers array', interviewersArray)
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment 
    key={appointment.id} 
    {...appointment}
    interview={interview}
    interviewers={interviewersArray}
    />)
  })


      
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
            days={state.days}
            day={state.day}
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
