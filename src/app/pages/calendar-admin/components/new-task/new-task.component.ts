import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/Constants/Constant';
import { ServiciosService } from 'src/app/services/servicios.service';
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
  in_dateSelect: any;
  listaUsuarios: any[] = [];
  listarTypes: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private servicios: ServiciosService,
  ) {
    // This is intentional
  }

  ngOnInit(): void {
    console.log('Date Select pasado es 1 ', this.in_dateSelect);
    this.initNewTask();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    console.log('Date Select pasado  2 es ', this.in_dateSelect);
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
    this.servicios.getAllUsers().subscribe({
      next: (res) => {
        this.listaUsuarios = res;
      },
      error: (err) => {
        this.toastrService.error('Error al listar usuarios' + err, 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  /**
   * A function that lists the types of tasks.
   */
  listarTypeTask() {
    this.servicios.getAllTypes().subscribe({
      next: (res) => {
        this.listarTypes = res;
      },
      error: (err) => {
        this.toastrService.error('Error al listar types' + err, 'Error', {
          timeOut: 3000,
        });
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

  sendNotification(data) {
    this.servicios.sendNotification(data).subscribe({
      next: (res) => {
        console.log('Res sendNotification ->', res);
        this.toastrService.success('Notificaciones enviadas exitosamente', 'Exito', {
          timeOut: 3000,
        });
      },
      error(err) {
        this.toastrService.error('Error al enviar notificacion task', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  formatDataNotification(users, taskToUser) {
    return { users: users, taskToUser: taskToUser };
  }

  crearTask() {
    console.log('Value Form', this.crearNewTask.value);
    this.servicios.createNewTask(this.crearNewTask.value).subscribe({
      next: (res) => {
        this.respuestaNewTaskComponent.emit();
        if (res.message == Constant.MENSAJE_OK) {
          console.log('Response createTask ', res);
          this.toastrService.success('Task registrada exitosamente', 'Exito', {
            timeOut: 3000,
          });
          this.sendNotification(
            this.formatDataNotification(this.crearNewTask.value.users, res.taskToUser),
          );
        } else {
          this.toastrService.error('Error al registrar task', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (err) => {
        this.respuestaNewTaskComponent.emit();
        this.toastrService.error('Error al registrar task', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }
}