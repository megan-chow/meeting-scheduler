import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import ICAL from "ical.js";

async function parseICS(url) {
  const text = await fetch(url).then((r) => r.text());
  const jcalData = ICAL.parse(text);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  return vevents.map((v) => {
    const event = new ICAL.Event(v);
    return {
      title: event.summary,
      start: event.startDate.toJSDate(),
      end: event.endDate.toJSDate(),
      allDay: event.startDate.isDate,
    };
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new Calendar(calendarEl, {
    plugins: [
      googleCalendarPlugin,
      dayGridPlugin,
      timeGridPlugin,
      iCalendarPlugin,
    ],
    initialView: "dayGridMonth",
    initialDate: "2026-03-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    eventSources: [],
  });

  // Load ICS files
  const calendar1Events = await parseICS("/calendars/test1.ics");
  const calendar2Events = await parseICS("/calendars/test2.ics");

  // Add event sources
  calendar.addEventSource({
    id: "cal1",
    events: calendar1Events,
    color: "#3b82f6",
  });

  calendar.addEventSource({
    id: "cal2",
    events: calendar2Events,
    color: "#10b981",
  });

  // Render after adding events
  calendar.render();
});
