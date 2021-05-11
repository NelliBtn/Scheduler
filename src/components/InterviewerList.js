import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"



export default function InterviewerList(props) {

  const interviewer = props.interviewers.map((interviewer) => {

    return <InterviewerListItem 
    id={interviewer.id}
    key={interviewer.id} 
    setInterviewer={event => props.onChange(interviewer.id)} // check if id changed
    selected={interviewer.id === props.value} 
    {...interviewer}></InterviewerListItem>
  })

  return(
    <section className="interviewers">
      {interviewer}
    </section>
  )
}