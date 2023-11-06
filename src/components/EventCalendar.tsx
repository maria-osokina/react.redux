import React, { FC } from "react";
import { Calendar, CalendarProps } from "antd";
import { IEvent } from "../models/IEvent";
import { Dayjs } from "dayjs";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  const dateCellRender = (value: Dayjs) => {
    const formattedDate = formatDate(value.toDate());
    const currentDayEvents = props.events.filter(
      (ev) => ev.date === formattedDate
    );
    return (
      <div>
        {currentDayEvents.map((event, index) => (
          <div key={index}>{event.description}</div>
        ))}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default EventCalendar;
