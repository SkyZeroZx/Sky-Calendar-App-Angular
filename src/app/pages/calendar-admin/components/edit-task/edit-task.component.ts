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
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  editTaskForm: FormGroup;

  @Output()
  respuestaEditTaskComponent = new EventEmitter<any>();

  @Input()
  in_editTask: any;
  listaUsuarios: any[] = [];
  listarTypes: any[] = [];
  today: Date;
  maxDate: Date;
  minDate: Date;
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private servicios: ServiciosService,
  ) {
    this.today = new Date();
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), new Date(this.today.getFullYear(),  this.today.getMonth() + 1, 0).getDate());
 
  }

  ngOnInit(): void {
    this.crearFormularioNewTask();
    this.listarUserByTask();
    this.listarUsers();
    this.listarTypeTask();
    this.detailsEdit();
    console.log('in_editTask ', this.in_editTask);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.ngOnInit();
  }

  editarTask() {
    console.log('Form Edit Task Values ', this.editTaskForm.value);
    this.servicios.updateTask(this.editTaskForm.value).subscribe({
      next: (res) => {
        console.log(' Res editar Task ', res);
        this.respuestaEditTaskComponent.emit();
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success('Se actualizo exitosamente la tarea', 'Exito', {
            timeOut: 3000,
          });
        } else {
          this.toastrService.error('Error al actualizar la tarea', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (_err) => {
        console.log('  ERR EDITAR TASK ', _err);
        this.respuestaEditTaskComponent.emit();
        this.toastrService.error('Error al actualizar la tarea', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  listarUsers() {
    this.servicios.getAllUsers().subscribe({
      next: (res) => {
        console.log('Listar Usuarios ->', res);
        this.listaUsuarios = res;
      },
      error: (err) => {
        this.toastrService.error('Error al listar usuarios' + err, 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

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

  formatData() {
    return { id: this.in_editTask?.event?._def?.publicId };
  }

  listarUserByTask() {
    // Enviamos el id del task
    this.servicios.getUsersByTask(this.formatData()).subscribe({
      next: (res) => {
        this.editTaskForm.controls.users.setValue(res);
      },
      error: (err) => {
        console.log('Error Users By Task', err);
        this.toastrService.error('Error al listar usuarios por tarea', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  removeUserToTask(item: any) {
    console.log('Usuario removido es ', item.value);
    this.servicios.deleteUserToTask(this.formatDataUserToTask(item.value.id)).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success('Se removio exitosamente al usuario', 'Exito', {
            timeOut: 3000,
          });
        } else {
          this.toastrService.error('Error al remover usuario', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (_err) => {
        this.toastrService.error('Error al remover usuario', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  formatDataUserToTask(id: any) {
    return { codTask: this.editTaskForm.value.codTask, codUser: id };
  }

  addUserToTask(item: any) {
    console.log('Usuario agregado es ', item.id);
    this.servicios.addUserToTask(this.formatDataUserToTask(item.id)).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success('Se agrego exitosamente al usuario', 'Exito', {
            timeOut: 3000,
          });
        } else {
          this.toastrService.error('Error al agregar usuario', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (_err) => {
        this.toastrService.error('Error al agregar usuario', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  detailsEdit() {
    this.editTaskForm.controls.codTask.setValue(this.in_editTask?.event?._def?.publicId);
    this.editTaskForm.controls.title.setValue(this.in_editTask?.event?._def?.title);
    this.editTaskForm.controls.description.setValue(
      this.in_editTask?.event?._def?.extendedProps?.description,
    );
    this.editTaskForm.controls.codType.setValue(
      this.in_editTask?.event?._def?.extendedProps?.codType,
    );
    this.editTaskForm.controls.dateRange.setValue([
      this.in_editTask?.event?._instance?.range.start,
      this.in_editTask?.event?._instance?.range.end,
    ]);
  }

  crearFormularioNewTask() {
    this.editTaskForm = this.fb.group({
      codTask: new FormControl('', Validators.compose([Validators.required])),
      title: new FormControl('', Validators.compose([Validators.required])),
      codType: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      dateRange: new FormControl(null, Validators.compose([Validators.required])),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
  }
}
