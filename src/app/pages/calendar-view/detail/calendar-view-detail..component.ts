import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IType } from "src/app/entities/type";
import { EventClickArg } from "@fullcalendar/core";
import { TaskService } from "src/app/services/task/task.service";
@Component({
  selector: "app-calendar-view-detail",
  templateUrl: "./calendar-view-detail.component.html",
  styleUrls: ["./calendar-view-detail..component.scss"],
})
export class CalendarViewDetailComponent implements OnInit {
  viewForm: FormGroup;
  @Input()
  in_detailTask: EventClickArg;
  listarTypes: IType[] = [];
  listarUsers: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private taskService: TaskService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.crearFormularioViewTask();
    this.listarUserByTask();
    this.listarTypeTask();
    this.detailsEdit();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.ngOnInit();
  }

  listarTypeTask() {
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.listarTypes = res;
        this.viewForm.controls.codType.disable();
      },
      error: (_err) => {
        this.toastrService.error("Error al listar types", "Error");
      },
    });
  }

  listarUserByTask() {
    // Enviamos el id del task
    this.taskService
      .getUsersByTask(this.in_detailTask?.event?._def?.publicId)
      .subscribe({
        next: (res) => {
          this.listarUsers = res;
          this.viewForm.controls.users.setValue(res);
          this.viewForm.controls.users.disable();
        },
        error: (_err) => {
          this.toastrService.error(
            "Error al listar usuarios por tarea",
            "Error"
          );
        },
      });
  }

  crearFormularioViewTask() {
    this.viewForm = this.fb.group({
      title: new FormControl(""),
      codType: new FormControl(""),
      description: new FormControl(""),
      dateRange: new FormControl(null),
      users: new FormControl(""),
    });
  }

  detailsEdit() {
    this.viewForm.controls.title.setValue(
      this.in_detailTask?.event?._def?.title
    );
    this.viewForm.controls.description.setValue(
      this.in_detailTask?.event?._def?.extendedProps?.description
    );
    this.viewForm.controls.codType.setValue(
      this.in_detailTask?.event?._def?.extendedProps?.codType
    );
    this.viewForm.controls.dateRange.setValue([
      this.datePipe.transform(
        this.in_detailTask?.event?._instance?.range.start,
        "dd/MM/YYYY"
      ),
      this.datePipe.transform(
        this.in_detailTask?.event?._instance?.range.end,
        "dd/MM/YYYY"
      ),
    ]);
  }
}
