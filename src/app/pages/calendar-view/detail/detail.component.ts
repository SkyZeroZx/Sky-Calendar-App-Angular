import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  viewForm: FormGroup;

  @Input()
  in_detailTask: any;
  listaUsuarios: any[] = [];
  listarTypes: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private servicios: ServiciosService,
    private datePipe: DatePipe,
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

  formatData() {
    return { id: this.in_detailTask?.event?._def?.publicId };
  }

  listarTypeTask() {
    this.servicios.getAllTypes().subscribe({
      next: (res) => {
        this.listarTypes = res;
        this.viewForm.controls.codType.disable();
      },
      error: (err) => {
        this.toastrService.error('Error al listar types' + err, 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  listarUserByTask() {
    // Enviamos el id del task
    this.servicios.getUsersByTask(this.formatData()).subscribe({
      next: (res) => {
        this.viewForm.controls.users.setValue(res);
        this.viewForm.controls.users.disable();
      },
      error: (err) => {
        console.log('Error Users By Task', err);
        this.toastrService.error('Error al listar usuarios por tarea', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  crearFormularioViewTask() {
    this.viewForm = this.fb.group({
      title: new FormControl(''),
      codType: new FormControl(''),
      description: new FormControl(''),
      dateRange: new FormControl(null),
      users: new FormControl(''),
    });
  }

  detailsEdit() {
    this.viewForm.controls.title.setValue(this.in_detailTask?.event?._def?.title);
    this.viewForm.controls.description.setValue(
      this.in_detailTask?.event?._def?.extendedProps?.description,
    );
    this.viewForm.controls.codType.setValue(
      this.in_detailTask?.event?._def?.extendedProps?.codType,
    );
    this.viewForm.controls.dateRange.setValue([
      this.datePipe.transform(
        this.in_detailTask?.event?._instance?.range.start,
        'dd/MM/YYYY',
      ),
      this.datePipe.transform(
        this.in_detailTask?.event?._instance?.range.end,
        'dd/MM/YYYY',
      ),
    ]);
  }
}
