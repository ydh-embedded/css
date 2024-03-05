import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={[
        { title: 'Event 1', date: '2023-03-01' },
        { title: 'Event 2', date: '2023-03-05' },
        { title: 'Event 3', date: '2023-03-10' },
      ]}
    />
  );
};

export default Calendar;