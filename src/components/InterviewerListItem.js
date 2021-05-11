import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames"

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar
  })

  return(
    <li className={interviewerClass}>
      <img
        className={interviewerClass}
        onClick={props.setInterviewer}
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  )
}