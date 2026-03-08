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

let calendar;

document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById("calendar");

  calendar = new Calendar(calendarEl, {
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
    color: "#B9BFFB",
  });

  calendar.addEventSource({
    id: "cal2",
    events: calendar2Events,
    color: "#BEFF",
  });

  calendar.addEventSource({
    id: "cal3",
    events: calendar2Events,
    color: "#FEF196",
  });

  // Render after adding events
  calendar.render();
});

document
  .getElementById("meeting-submit")
  .addEventListener("click", findAllTimes);

function findAllTimes() {
  console.log("finding times");
  let startTime = document.getElementById("meeting-start-date").value;
  let endTime = document.getElementById("meeting-end-date").value;
  const startObject = new Date(startTime);
  const endObject = new Date(endTime);

  console.log("start: " + startObject);
  console.log("end: " + endObject);

  let eventsInRange = calendar
    .getEvents()
    .filter((ev) => ev.start >= startObject && ev.start < endObject)
    .map((ev) => ({
      start: ev.start,
      end: ev.end || new Date(ev.start.getTime() + 30 * 60 * 1000), // fallback 30min
    }))
    .sort((a, b) => a.start - b.start);
  console.log(eventsInRange);
  let durationHours = document.getElementById("meeting-duration-hour").value;
  let durationMinutes = document.getElementById(
    "meeting-duration-minutes",
  ).value;
  durationHours = parseInt(durationHours, 10);
  durationMinutes = parseInt(durationMinutes, 10);
  let duration;
  let freeTimes = [];

  let event_i = 0;
  let d = new Date(startObject);
  console.log(d);
  while (d < endObject) {
    console.log("d: " + d);
    let meetingEnd = new Date(d);
    meetingEnd.setHours(meetingEnd.getHours() + durationHours);
    meetingEnd.setMinutes(meetingEnd.getMinutes() + durationMinutes);
    console.log("meetingEnd: " + meetingEnd);
    if (meetingEnd <= eventsInRange[event_i].start) {
      freeTimes.push({
        start: new Date(d),
        end: new Date(meetingEnd),
      });
      d.setMinutes(d.getMinutes + 15);
    } else {
      d = eventsInRange[event_i].end;
      event_i++;
    }
  }
  console.log(freeTimes);
  let timesList = document.getElementById("times-list");
  for (let i = 0; i < freeTimes.length; i++) {
    let el = document.createElement("div");
    el.className = "available-time-option";

    let startTimeSpan = document.createElement("span");
    startTimeSpan.innerHTML = freeTimes[i].start;

    let endTimeSpan = document.createElement("span");
    endTimeSpan.innerHTML = freeTimes[i].end;

    // You forgot these two lines:
    el.appendChild(startTimeSpan);
    el.appendChild(endTimeSpan);

    timesList.appendChild(el);
  }
}
