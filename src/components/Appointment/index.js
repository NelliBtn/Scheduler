/* Group components to organize them, 
and use index.js as the default module for a folder.
*/
import React from 'react'
// import styles once, it will be available to all the children
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true)
      })
  }

  function edit() {
    transition(EDIT);
  }

  function deleteAppt() {
    transition(CONFIRM);
  }

  function confirm(id) {
    transition(DELETING, true);
    props.cancelInterview(id)
    .then((res) => {
      transition(EMPTY);
    })
    .catch((err) => {
      transition(ERROR_DELETE, true)
    })
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = 'EDIT';
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
      <Form 
      onCancel={() => back()} 
      onSave={save}
      interviewers={props.interviewers} 
      {...props}/>}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting appointment" onClose={() => back()}/>}
      {mode === ERROR_SAVE && <Error message="Error saving appointment" onClose={() => back()}/>}
      {mode === CONFIRM && 
      <Confirm 
      id={props.id} 
      onConfirm={confirm}
      onCancel={() => back()}
      message="Are you sure you want to delete an appointment?"/>}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={deleteAppt}
        onEdit={edit}
        {...props}
      />
      )}
      {mode === EDIT && 
      <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onCancel={() => back()}
        onSave={save}
        interviewers={props.interviewers}
        {...props}
      />
      }
    </article>
  )
} 