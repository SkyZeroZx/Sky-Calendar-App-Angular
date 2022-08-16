import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventInput,
  EventChangeArg,
} from "@fullcalendar/angular";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Constant } from "src/app/Constants/Constant";
import Swal from "sweetalert2";
import esLocale from "@fullcalendar/core/locales/es";
import { listLocales } from "ngx-bootstrap/chronos";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { TaskService } from "src/app/services/task/task.service";

@Component({
  selector: "app-calendar-admin",
  templateUrl: "./calendar-admin.component.html",
  styleUrls: ["./calendar-admin.component.scss"],
})
export class CalendarAdminComponent implements OnInit {
  locale = "es";
  locales = listLocales();
  // Modal Crear Nuevo Task
  @ViewChild("modalNewTask", { static: false })
  public modalNewTask: ModalDirective;
  // Modal Editar Task
  @ViewChild("modalEditTask", { static: false })
  public modalEditTask: ModalDirective;
  taskList: EventInput[] = [];
  // Valor del Task seleccionado que pasaremos para editarlo
  taskEdit: any;
  // Fecha seleccionada para crear un nuevo task
  dateSelect: any;
  // Variables booleas que validan activacion de los modales
  taskEditOk: boolean = false;
  taskCreateOk: boolean = false;

  constructor(
    private servicios: TaskService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  // Creamos nuestro calendario con las configuraciones respectivas para el administrador
  calendarOptions: CalendarOptions = {
    contentHeight: "auto",
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    unselectAuto: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.eventDraggable.bind(this),
    locales: [esLocale],
  };

  ngOnInit(): void {
    this.listarTask();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    this.dateSelect = selectInfo;
    this.taskCreateOk = true;
    this.modalNewTask.show();
    calendarApi.unselect();
  }

  listarTask() {
    this.servicios.getAllTasks().subscribe({
      next: (res) => {
        this.calendarOptions.events = res;
      },
      error: (_err) => {
        this.toastrService.error(
          "Sucedio un error al listar las tareas",
          "Error"
        );
      },
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.optionsClickEvent(clickInfo);
  }

  eventDraggable(item: EventChangeArg) {
    item.event.remove();
    this.servicios
      .updateTask(
        this.formatedTaskChange(
          item.event._def.publicId,
          item.event._instance.range
        )
      )
      .subscribe({
        next: (res) => {
          if (res.message == Constant.MENSAJE_OK) {
            this.toastrService.success(
              "Tarea actualizada exitosamente",
              "Exito"
            );
            this.listarTask();
          } else {
            this.toastrService.error("Error al actualizar tarea", "Error");
            this.listarTask();
          }
        },
        error: (_err) => {
          this.toastrService.error("Error al actualizar tarea", "Error");
          this.listarTask();
        },
      });
  }

  formatedTaskChange(codTask, dateRange) {
    return { codTask: codTask, dateRange: [dateRange.start, dateRange.end] };
  }

  formatDataRemoveTask(id) {
    return { codTask: parseInt(id) };
  }

  removeTask(id) {
    this.servicios.deleteTask(this.formatDataRemoveTask(id)).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.listarTask();
          this.toastrService.success("Tarea eliminada exitosamente", "Exito");
        } else {
          this.toastrService.error("Error al eliminar la tarea", "Error");
        }
      },
      error: (_err) => {
        this.toastrService.error("Error al eliminar la tarea", "Error");
      },
    });
  }

  optionsClickEvent(item: any) {
    Swal.fire({
      title: "¿Que acción desea realizar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `Eliminar`,
      cancelButtonText: "Cancelar",
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
