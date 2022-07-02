import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/Constants/Constant';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import esLocale from '@fullcalendar/core/locales/es';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
 @Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.scss'],
})
export class CalendarAdminComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  @ViewChild('externalEvents', { static: true })
  externalEvents: ElementRef;
  // Modal Crear Nuevo Task
  @ViewChild('modalNewTask', { static: false })
  public modalNewTask: ModalDirective;
  // Modal Editar Task
  @ViewChild('modalEditTask', { static: false })
  public modalEditTask: ModalDirective;
  currentEvents: EventApi[] = [];
  taskList: EventInput[] = [];
  // Valor del Task seleccionado que pasaremos para editarlo
  taskEdit: any;
  // Fecha seleccionada para crear un nuevo task
  dateSelect: any;
  // Variables booleas que validan activacion de los modales
  taskEditOk: boolean = false;
  taskCreateOk: boolean = false;

   constructor(
    private servicios: ServiciosService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService,
  ) {
    this.localeService.use(this.locale);
  }
  dateEndTest: any;
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.eventDraggable.bind(this),
    locales: [esLocale],
  };

  ngOnInit(): void {
     this.listarTask();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log('handleDateSelect ', selectInfo);
    const calendarApi = selectInfo.view.calendar;
    this.dateSelect = selectInfo;
    this.taskCreateOk = true;
    this.modalNewTask.show();
    calendarApi.unselect();
  }

 

  listarTask() {
    this.servicios.getAllTasks().subscribe({
      next: (res) => {
        console.log('response All Task ->', res);
        this.taskList = [...res];
        this.calendarOptions.events = res;
      },
      error: (err) => {
        console.log('Error All Task ', err);
      },
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log('Click Info', clickInfo);
    this.optionsClickEvent(clickInfo);
  }

  eventDraggable(item: any) {
    console.log('test eventDraggable', item);
    console.log('test eventDraggable event', item.event);
    this.servicios
      .updateTask(
        this.formatedTaskChange(item.event._def.publicId, item.event._instance.range),
      )
      .subscribe({
        next: (res) => {
          if (res.message == Constant.MENSAJE_OK) {
            this.toastrService.success('Tarea actualizada exitosamente', 'Exito', {
              timeOut: 3000,
            });
          } else {
            this.toastrService.error('Error al actualizar tarea', 'Error', {
              timeOut: 3000,
            });
          }
        },
        error: (_err) => {
          this.toastrService.error('Error al actualizar tarea', 'Error', {
            timeOut: 3000,
          });
        },
      });
  }

  formatedTaskChange(codTask, dateRange) {
    return { codTask: codTask, dateRange: [dateRange.start, dateRange.end] };
  }

  handleEvents(events: EventApi[]) {
    console.log('Events ', events);
    this.currentEvents = events;
  }

  formatDataRemoveTask(id) {
    return { codTask: parseInt(id) };
  }

  removeTask(id) {
    this.servicios.deleteTask(this.formatDataRemoveTask(id)).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.listarTask();
          this.toastrService.success('Tarea eliminada exitosamente', 'Exito', {
            timeOut: 3000,
          });
        } else {
          this.toastrService.error('Error al eliminar la tarea', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (_err) => {
        this.toastrService.error('Error al eliminar la tarea', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  optionsClickEvent(item: any) {
    Swal.fire({
      title: '¿Que accion desea realizar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskEdit = item;
        this.taskEditOk = true;
        this.modalEditTask.show();
      } else if (result.isDenied) {
        this.removeTask(item.event?._def?.publicId);
      }
    });
  }
}
