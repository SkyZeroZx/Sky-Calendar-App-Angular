import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Constant } from "src/app/Constants/Constant";
import { IType } from "src/app/entities/type";
import { IUser } from "src/app/entities/user";
import { TaskService } from "src/app/services/task/task.service";
import { UserService } from "src/app/services/users/user.service";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"],
})
export class EditTaskComponent implements OnInit {
  editTaskForm: FormGroup;
  //Output para emitir respuesta que cerrara el modal al terminar de editar
  @Output()
  respuestaEditTaskComponent = new EventEmitter<any>();
  // Valor de entrada del componente padre
  @Input()
  in_editTask: any;
  listaUsuarios: IUser[] = [];
  listarTypes: IType[] = [];
  today: Date;
  maxDate: Date;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.crearFormularioNewTask();
    this.listarUserByTask();
    this.listarUsers();
    this.listarTypeTask();
    this.detailsEdit();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.ngOnInit();
  }

  editarTask() {
    this.taskService.updateTask(this.editTaskForm.value).subscribe({
      next: (res) => {
        this.respuestaEditTaskComponent.emit();
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success(
            "Se actualizo exitosamente la tarea",
            "Exito"
          );
        } else {
          this.toastrService.error("Error al actualizar la tarea", "Error");
        }
      },
      error: (_err) => {
        this.respuestaEditTaskComponent.emit();
        this.toastrService.error("Error al actualizar la tarea", "Error");
      },
    });
  }

  listarUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listaUsuarios = res;
      },
      error: (err) => {
        this.toastrService.error(`Error al listar usuarios ${err}`, "Error");
      },
    });
  }

  listarTypeTask() {
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.listarTypes = res;
      },
      error: (err) => {
        this.toastrService.error(`Error al listar usuarios ${err}`, "Error");
      },
    });
  }

  formatData() {
    return { id: this.in_editTask?.event?._def?.publicId };
  }

  listarUserByTask() {
    // Enviamos el id del task
    this.taskService.getUsersByTask(this.formatData()).subscribe({
      next: (res) => {
        this.editTaskForm.controls.users.setValue(res);
      },
      error: (err) => {
        this.toastrService.error("Error al listar usuarios por tarea", "Error");
      },
    });
  }

  removeUserToTask(item: any) {
    this.taskService
      .deleteUserToTask(this.formatDataUserToTask(item.value.id))
      .subscribe({
        next: (res) => {
          if (res.message == Constant.MENSAJE_OK) {
            this.toastrService.success(
              "Se removio exitosamente al usuario",
              "Exito"
            );
          } else {
            this.toastrService.error("Error al remover usuario", "Error");
          }
        },
        error: (_err) => {
          this.toastrService.error("Error al remover usuario", "Error");
        },
      });
  }

  formatDataUserToTask(id: any) {
    return { codTask: this.editTaskForm.value.codTask, codUser: id };
  }

  addUserToTask(item: any) {
    this.taskService
      .addUserToTask(this.formatDataUserToTask(item.id))
      .subscribe({
        next: (res) => {
          if (res.message == Constant.MENSAJE_OK) {
            this.toastrService.success(
              "Se agrego exitosamente al usuario",
              "Exito"
            );
          } else {
            this.toastrService.error("Error al agregar usuario", "Error");
          }
        },
        error: (_err) => {
          this.toastrService.error("Error al agregar usuario", "Error");
        },
      });
  }

  detailsEdit() {
    this.editTaskForm.controls.codTask.setValue(
      this.in_editTask?.event?._def?.publicId
    );
    this.editTaskForm.controls.title.setValue(
      this.in_editTask?.event?._def?.title
    );
    this.editTaskForm.controls.description.setValue(
      this.in_editTask?.event?._def?.extendedProps?.description
    );
    this.editTaskForm.controls.codType.setValue(
      this.in_editTask?.event?._def?.extendedProps?.codType
    );
    this.editTaskForm.controls.dateRange.setValue([
      this.in_editTask?.event?._instance?.range.start,
      this.in_editTask?.event?._instance?.range.end,
    ]);
  }

  crearFormularioNewTask() {
    this.editTaskForm = this.fb.group({
      codTask: new FormControl("", Validators.compose([Validators.required])),
      title: new FormControl("", Validators.compose([Validators.required])),
      codType: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      dateRange: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      users: new FormControl("", Validators.compose([Validators.required])),
    });
  }
}
