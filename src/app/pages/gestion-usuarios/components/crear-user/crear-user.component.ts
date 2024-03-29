import { Component, OnInit, SimpleChanges } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Constant } from "src/app/Constants/Constant";
import { UserService } from "src/app/services/users/user.service";

@Component({
  selector: "app-crear-user",
  templateUrl: "./crear-user.component.html",
  styleUrls: ["./crear-user.component.scss"],
})
export class CrearUserComponent implements OnInit {
  // declaramos nuestro FormGroup para crearUser
  crearUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.crearFormularioCreateUser();
  }

  // Limpiamos y seteamos los valores de nuestros formulario (evitamos espacios en blanco)
  trimCrearUserForm() {
    this.crearUserForm.controls.username.setValue(
      this.crearUserForm.value.username.trim()
    );
    this.crearUserForm.controls.nombre.setValue(
      this.crearUserForm.value.nombre.trim()
    );
    this.crearUserForm.controls.apellidoPaterno.setValue(
      this.crearUserForm.value.apellidoPaterno.trim()
    );
    this.crearUserForm.controls.apellidoMaterno.setValue(
      this.crearUserForm.value.apellidoMaterno.trim()
    );
  }

  // Llamada al servicio updateUser para actualizar nuestro usuario
  crearUsuario() {
    this.trimCrearUserForm();
    this.userService.createUser(this.crearUserForm.value).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success(
            "Se creo exitosamente el usuario",
            "Exito"
          );
          this.crearUserForm.reset();
          this.crearUserForm.controls.role.setValue("admin");
        } else {
          this.toastrService.error(
            "Sucedio un error al crear : " + res.message,
            "Error"
          );
        }
      },
      error: (_err) => {
        this.toastrService.error("Hubo un error al crear el usuario", "Error");
      },
    });
  }

  // Metodo para creacion de reactiveForm
  crearFormularioCreateUser() {
    this.crearUserForm = this.fb.group({
      id: new FormControl(""),
      username: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(120),
          Validators.email,
        ])
      ),
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
          Validators.pattern("[A-Za-z ]+"),
        ])
      ),
      apellidoPaterno: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern("[A-Za-z ]+"),
        ])
      ),
      apellidoMaterno: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern("[A-Za-z ]+"),
        ])
      ),
      role: new FormControl("admin"),
    });
  }
}
