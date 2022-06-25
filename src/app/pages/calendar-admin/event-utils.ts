import { EventInput } from "@fullcalendar/angular";

let eventGuid = 0;
const TODAY_STR = () => {
  let dateObj = new Date();
  if (dateObj.getUTCMonth() < 10) {
    return dateObj.getUTCFullYear() + "-" + ("0" + (dateObj.getUTCMonth() + 1));
  } else {
    return dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1);
  }
};

// Calendar Event Source
let exampleEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() + "-08T08:30:00",
    end: TODAY_STR() + "-08T13:00:00",
    title: "Google Developers Meetup",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(1,104,250, .15)",
    borderColor: "#0168fa",
    display: "block",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-10T09:00:00",
    end: TODAY_STR() + "-10T17:00:00",
    title: "Design/Code Review",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(1,104,250, .15)",
    borderColor: "#0168fa",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-13T12:00:00",
    end: TODAY_STR() + "-13T18:00:00",
    title: "Lifestyle Conference",
    description:
      "Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi...",
    backgroundColor: "rgba(1,104,250, .15)",
    borderColor: "#0168fa",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-15T07:30:00",
    end: TODAY_STR() + "-15T15:30:00",
    title: "Team Weekly Trip",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(1,104,250, .15)",
    borderColor: "#0168fa",
  },
  {
    id: "TESTING ID DJ",
    start: TODAY_STR() + "-17T10:00:00",
    end: TODAY_STR() + "-19T15:00:00",
    title: "DJ Festival",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(1,104,250, .15)",
    borderColor: "#0168fa",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-08T13:00:00",
    end: TODAY_STR() + "-08T18:30:00",
    title: "Carl Henson's Wedding",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(1,104,250, .15)",
    borderColor: "#0168fa",
  },
];

let birthdayEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() + "-01T18:00:00",
    end: TODAY_STR() + "-01T23:30:00",
    title: "Jensen Birthday",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(16,183,89, .25)",
    borderColor: "#10b759",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-21T15:00:00",
    end: TODAY_STR() + "-21T21:00:00",
    title: "Carl's Birthday",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(16,183,89, .25)",
    borderColor: "#10b759",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-23T15:00:00",
    end: TODAY_STR() + "-23T21:00:00",
    title: "Yaretzi's Birthday",
    description:
      "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...",
    backgroundColor: "rgba(16,183,89, .25)",
    borderColor: "#10b759",
    display: "block",
  },
];

let holidayEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() + "-04",
    end: TODAY_STR() + "-06",
    title: "Feast Day",
    backgroundColor: "rgba(241,0,117,.25)",
    borderColor: "#f10075",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-26",
    end: TODAY_STR() + "-27",
    title: "Memorial Day",
    backgroundColor: "rgba(241,0,117,.25)",
    borderColor: "#f10075",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-28",
    end: TODAY_STR() + "-29",
    title: "Veteran's Day",
    backgroundColor: "rgba(241,0,117,.25)",
    borderColor: "#f10075",
  },
];

let discoveredEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() + "-17T08:00:00",
    end: TODAY_STR() + "-18T11:00:00",
    title: "Web Design Workshop Seminar",
    backgroundColor: "rgba(0,204,204,.25)",
    borderColor: "#00cccc",
  },
];

let meetupEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() + "-03",
    end: TODAY_STR() + "-05",
    title: "UI/UX Meetup Conference",
    backgroundColor: "rgba(91,71,251,.2)",
    borderColor: "#5b47fb",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-18T11:00:00",
    end: TODAY_STR() + "-20T22:00:00",
    title: "Angular Conference Meetup",
    backgroundColor: "rgba(91,71,251,.2)",
    borderColor: "#5b47fb",
  },
];

let otherEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() + "-06",
    end: TODAY_STR() + "-08",
    title: "My Rest Day",
    backgroundColor: "rgba(253,126,20,.25)",
    borderColor: "#fd7e14",
  },
  {
    id: createEventId(),
    start: TODAY_STR() + "-29",
    end: TODAY_STR() + "-31",
    title: "My Rest Day",
    backgroundColor: "rgba(253,126,20,.25)",
    borderColor: "#fd7e14",
  },
];

let testingEvent = [
  [
    {
      id: 1,
      title: "ACTIVIDAD MAÑANA 1 TITLE",
      description: "ACTIVIDAD MAÑANA 1 DESCRIPTION",
      backgroundColor: "rgba(16,183,89, .25)",
      borderColor: "#10b759",
      start: "2022-06-23T08:00:00",
      end: "2022-06-23T12:00:00",
    },
    {
      id: 2,
      title: "ACTIVIDAD VESPERTINO 1 TITLE",
      description: "VESPERTINO 1 DESCRIPTION",
      backgroundColor: "rgba(253,126,20,.25)",
      borderColor: "#fd7e14",
      start: "2022-06-23T13:00:00",
      end: "2022-06-23T18:00:00",
    },
    {
      id: 3,
      title: "ACTIVIDAD NOCTURNO 24 TITLE",
      description: "NOCTURNO 1 DESCRIPTION",
      backgroundColor: "rgba(91,71,251,.2)",
      borderColor: "#5b47fb",
      start: "2022-06-24T19:00:00",
      end: "2022-06-24T23:00:00",
    },
    {
      id: 10,
      title: "TESTING BD TITLE",
      description: "TESTING BD",
      backgroundColor: "rgba(253,126,20,.25)",
      borderColor: "#fd7e14",
      start: "2022-06-25T13:00:00",
      end: "2022-06-25T18:00:00",
    },
  ],
];

export const INITIAL_EVENTS: EventInput[] = [];
export const TESTING_EVENTS : EventInput[] = [testingEvent];
export const INITIAL_EVENTS_AFETER: EventInput[] = [
  ...exampleEvents,
 /* ...birthdayEvents,
  ...holidayEvents,
  ...discoveredEvents,
  ...meetupEvents,
  ...otherEvents,*/
];

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00'
//   }
// ];

export function createEventId() {
  return String(eventGuid++);
}
