import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/Constants/Constant';
import { IType } from 'src/app/entities/type';
import { IUser } from 'src/app/entities/user';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/users/user.service';
 @Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  crearNewTask: FormGroup;
  @Output()
  respuestaNewTaskComponent = new EventEmitter<any>();

  @Input()
  in_dateSelect: DateSelectArg;
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
  ) {

  }

  ngOnInit(): void {
    this.initNewTask();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.initNewTask();
  }

  // Metodo que inicializa las listas y formulario del componente
  initNewTask() {
    this.crearFormularioNewTask();
    this.listarUsers();
    this.listarTypeTask();
    this.selectDetail();
  }

  selectDetail() {
    if (this.in_dateSelect.allDay) {
      let endDate = new Date(this.in_dateSelect.end);
      endDate.setDate(endDate.getDate() - 1);
      this.crearNewTask.controls.dateRange.setValue([this.in_dateSelect.start, endDate]);
    } else {
      let endDate = new Date(this.in_dateSelect.end);
      endDate.setDate(endDate.getDate());
      this.crearNewTask.controls.dateRange.setValue([this.in_dateSelect.start, endDate]);
    }
  }

  // Metodo que valida el type seleccionado en caso de ser nocturno
  validateTypeDate() {
    // Nocturno es type 3
    if (this.crearNewTask.value.codType == 3) {
      let endDate = new Date(this.in_dateSelect.end);
      endDate.setDate(endDate.getDate());
      this.crearNewTask.controls.dateRange.setValue([this.in_dateSelect.start, endDate]);
    } else {
      // Para el caso contrario que seria 1 o 2 u otro dejar fechas originales
      this.selectDetail();
    }
  }

  /**
   * It gets all the users from the database and stores them in the listaUsuarios variable.
   */
  listarUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listaUsuarios = res;
      },
      error: (err) => {
        this.toastrService.error(`Error al listar usuarios ${err}`, 'Error');
      },
    });
  }

  /**
   * A function that lists the types of tasks.
   */
  listarTypeTask() {
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.listarTypes = res;
      },
      error: (err) => {
        this.toastrService.error(`Error al listar types  ${err}`, 'Error');
      },
    });
  }

  /**
   * It creates a form group with the fields codTask, title, type, description, dateRange and users
   */
  crearFormularioNewTask() {
    this.crearNewTask = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      codType: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      dateRange: new FormControl(null, Validators.compose([Validators.required])),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  /**
   * It sends a notification to the user.
   * @param data - The data to send to the server.
   */
  sendNotification(data) {
    this.userService.sendNotification(data).subscribe({
      next: (res) => {
        this.toastrService.success('Notificaciones enviadas exitosamente', 'Exito');
      },
      error(_err) {
        this.toastrService.error('Error al enviar notificacion task', 'Error');
      },
    });
  }

  formatDataNotification(users) {
    return { users: users };
  }


  crearTask() {
    this.taskService.createNewTask(this.crearNewTask.value).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {

          this.toastrService.success('Task registrada exitosamente', 'Exito');
          this.sendNotification(
            this.formatDataNotification(this.crearNewTask.value.users),
          );
        } else {
          this.toastrService.error('Error al registrar task', 'Error');
        }
        this.respuestaNewTaskComponent.emit();
      },
      error: (_err) => {
        this.toastrService.error('Error al registrar task', 'Error');
        this.respuestaNewTaskComponent.emit();
      },
    });
  }
}
