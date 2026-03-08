import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar'

// import '@fullcalendar/core/index.css'
// import '@fullcalendar/daygrid/index.css'

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  const calendar = new Calendar(calendarEl, {
    plugins: [
      googleCalendarPlugin,
      dayGridPlugin,
      iCalendarPlugin
    ],
    initialView: 'dayGridMonth',
    initialDate: '2026-03-07',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    // eventSources: [
    //   {
    //     url: 'https://calendar.google.com/calendar/ical/3bd238d0f6bd1af7156bdb335c7d9297b26c507d9e8ab9629fa3940ee4d7d3a1%40group.calendar.google.com/public/basic.ics',
    //     format: 'ics'
    //   },
    //   {
    //     url: 'https://example.com/calendar2.ics',
    //     format: 'ics'
    //   },
    //   {
    //     url: 'https://example.com/calendar3.ics',
    //     format: 'ics'
    //   }
    // ]
    events: [
      {
        title: 'All Day Event',
        start: '2026-03-01'
      },
      {
        title: 'Long Event',
        start: '2026-02-07',
        end: '2026-02-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2026-02-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2026-02-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2026-02-11',
        end: '2026-02-13'
      },
      {
        title: 'Meeting',
        start: '2026-02-12T10:30:00',
        end: '2026-02-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2026-02-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2026-02-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2026-02-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'https://google.com/',
        start: '2026-02-28'
      }
    ]
  });

  calendar.render();
});