import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  CalendarOptions,
  EventApi,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { ServiciosService } from "src/app/services/servicios.service";

@Component({
  selector: "app-calendar-view",
  templateUrl: "./calendar-view.component.html",
  styleUrls: ["./calendar-view.component.scss"],
})
export class CalendarViewComponent implements OnInit {
  @ViewChild("externalEvents", { static: true }) externalEvents: ElementRef;
  public modalNewTask: ModalDirective;
  currentEvents: EventApi[] = [];
  taskList: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    contentHeight: "auto",
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    initialEvents: [],
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private servicios: ServiciosService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.listarTaskByUser();
  }

  listarTaskByUser() {
    this.servicios.getTaskByUser().subscribe({
      next: (res) => {
        this.calendarOptions.events = res;
      },
      error: (err) => {
        console.log("Error Listar Task By User", err);
      },
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log("Click Details", clickInfo);
  }
}
