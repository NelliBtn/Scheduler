import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames"

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar
  })

  return(
    <span className={interviewerClass}>
      <img
        className={interviewerClass}
        onClick={() => props.setInterviewer(props.id)}
        src={props.avatar}
        alt={props.name}
        data-testid="interviewer-avatar"
      />
      {props.selected && props.name}
    </span>
  )
}