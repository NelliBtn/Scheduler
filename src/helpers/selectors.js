
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(apptDay => apptDay.name === day);
  console.log('Found a day match: ', filteredDay)

  const result = [];

  // adge cases if days was not found || no appointments for the day
  if (!filteredDay || filteredDay.appointments.length === 0) {
    return result;
  }

  // iterate through appointments array to compare id's
  for(let id of filteredDay.appointments) {
    result.push(state.appointments[id])
  }

  return result;
}