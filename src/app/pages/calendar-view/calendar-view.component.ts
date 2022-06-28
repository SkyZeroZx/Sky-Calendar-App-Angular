import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { listLocales } from 'ngx-bootstrap/chronos';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import esLocale from '@fullcalendar/core/locales/es';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
  locale = 'es';
  locales = listLocales();

  @ViewChild('externalEvents', { static: true }) externalEvents: ElementRef;
  public modalNewTask: ModalDirective;
  // Modal Crear Nuevo Task
  @ViewChild('modaViewTask', { static: false })
  public modaViewTask: ModalDirective;
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: [],
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    eventClick: this.handleEventClick.bind(this),
    locales: [esLocale],
  };

  constructor(
    private servicios: ServiciosService,
    private toastrService: ToastrService,
  ) {    }

  ngOnInit(): void {
    this.listarTaskByUser();
  }

  listarTaskByUser() {
    this.servicios.getTaskByUser().subscribe({
      next: (res) => {
        this.calendarOptions.events = res;
      },
      error: (err) => {
        console.log('Error Listar Task By User', err);
      },
    });
  }
  dateSelect: any;
  taskViewOk: boolean = false;

  handleEventClick(selectInfo: EventClickArg) {
    console.log('handleDateSelect ', selectInfo);
    const calendarApi = selectInfo.view.calendar;
    this.dateSelect = selectInfo;
    this.taskViewOk = true;
    this.modaViewTask.show();
    calendarApi.unselect();
  }
}
