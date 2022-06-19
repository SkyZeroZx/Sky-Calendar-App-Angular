import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/angular";
import { Draggable } from "@fullcalendar/interaction"; // for dateClick
import Swal from "sweetalert2";
import {
  INITIAL_EVENTS,
  createEventId,
  INITIAL_EVENTS_AFETER,
} from "./event-utils";

@Component({
  selector: "app-calendar-admin",
  templateUrl: "./calendar-admin.component.html",
  styleUrls: ["./calendar-admin.component.scss"],
})
export class CalendarAdminComponent implements OnInit {
  @ViewChild("externalEvents", { static: true }) externalEvents: ElementRef;

  calendarOptions: CalendarOptions = {
    contentHeight: "auto",

    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.eventDraggableTest.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor() {}

  test() {
    this.calendarOptions.events = INITIAL_EVENTS_AFETER;
  }

  ngOnInit(): void {
    // For external-events dragging
    /*  new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor'),
        };
      },
    });

    this.calendarOptions.initialEvents = INITIAL_EVENTS_AFETER;*/
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log('handleDateSelect ' , selectInfo)
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: "rgba(0,204,204,.25)",
        borderColor: "#00cccc",
      });
    }
  }

  listarTask(){
    console.log('TODO Listar Task');
  }

  handleEventClick(clickInfo: EventClickArg) {



    console.log('Click Info' , clickInfo);
    this.optionsClickEvent(clickInfo);
    /*
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }*/
  }

  eventDraggableTest(item : any){
    console.log('test eventDraggable' , item);
    console.log('test eventDraggable event' , item.event);
    console.log('test eventDraggable def' , item.event._def);
    console.log('Item drag id' , item.event._def.publicId)
  }

  handleEvents(events: EventApi[]) {
    console.log('Events ' , events);
    this.currentEvents = events;
  }

  optionsClickEvent(selectItem: any){
    Swal.fire({
      title: '¿Que accion desea realizar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Editado exitosamente', '', 'success')
      } else if (result.isDenied) {
        selectItem.event.remove();
        Swal.fire('Eliminado exitosamente', '', 'info')
      }
    })
  }

}
