import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';



function InterviewerList(props) {


  const interviewer = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
      id={interviewer.id}
      key={interviewer.id} 
      setInterviewer={props.onChange} // check if id changed
      selected={interviewer.id === props.value}
      {...interviewer}>
      </InterviewerListItem>
  })

  return(
    <section className="interviewers">
      {interviewer}
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;