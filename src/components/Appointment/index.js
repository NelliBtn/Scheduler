/* Group components to organize them, 
and use index.js as the default module for a folder.
*/
import React, { Fragment } from 'react'
// import styles once, it will be available to all the children
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  return(
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview && (
        <Fragment>
          <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          />
        </Fragment>
      )}
      {!props.interview && (
        <Fragment>
          <Empty />
        </Fragment>
      )}

    </article>
  )
} 