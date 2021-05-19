import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const day = props.days.map((day) => {
    return <DayListItem key={day.id} selected={day.name === props.day} 
                        setDay={props.setDay} {...day}></DayListItem>
    });

    return(
      <ul>
        {day}
      </ul>
    );
};