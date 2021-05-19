import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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
  
  useEffect(() => {
    const daysUrl = `/api/days`;
    const apptUrl = `/api/appointments`;
    const intUrl = `/api/interviewers`;
  
    Promise.all([
      axios.get(daysUrl),
      axios.get(apptUrl),
      axios.get(intUrl)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const state1 = {...state, appointments}
    // call spots function
    const days = updateSpots(state.day, state1);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
      })
  };
  


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const state1 = { ...state, appointments }

    // call spots function
    const days = updateSpots(state.day, state1);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      })
  };

  function updateSpots(dayName, state) {
    let spots = 0;
    // get the day
    const selectedDay = state.days.find(day => day.name === dayName);
    const selectedDayIndex = state.days.findIndex(day => day.name === dayName);
    // iterate through appointments array
    for (let id of selectedDay.appointments) {
      const selectedAppointment = state.appointments[id];
      //if interview is null +1 free spot
      if (!selectedAppointment.interview) {
        spots++;
      }
    };
    const selectedDayCopy = { ...selectedDay, spots };

    const daysCopy = [...state.days];
    daysCopy[selectedDayIndex] = selectedDayCopy;
    return daysCopy;
  };

  return { state, setDay, bookInterview, cancelInterview };
};