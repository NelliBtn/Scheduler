const getAppointmentsForDay = function(state, day) {
  const filteredDay = state.days.find(apptDay => apptDay.name === day);
  const result = [];
  // edge cases if days was not found
  if (!filteredDay) {
    return result;
  };
  // iterate through appointments array to compare id's
  for(let id of filteredDay.appointments) {
    result.push(state.appointments[id])
  };
  return result;
};


const getInterviewersForDay = function(state, day) {
  const result = [];
  const filteredDay = state.days.find(apptDay => apptDay.name === day);

  if (!filteredDay) {
    return result;
  };
  
  for (let id of filteredDay.interviewers) {
    if (state.interviewers[id]) {
      result.push(state.interviewers[id]);
    }
  };
  return result;
};



const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  };
  let result = {
    student: null,
    interviewer: null
  };
  const filteredInterviewer = state.interviewers[interview.interviewer];
  result.interviewer = filteredInterviewer;
  result.student = interview.student;
  return result;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };