import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Constant } from "src/app/Constants/Constant";
import Swal from "sweetalert2";
import "jspdf-autotable";
import { ReporteService } from "src/app/services/report/report.service";
import { UserService } from "src/app/services/users/user.service";

@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.scss"],
})
export class GestionUsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  listaUsuarios: any[];
  userSeleccionado: any;
  // Variable booleas que controlar el mostrar la lista y componente hijos
  listaUsuariosOk: boolean = false;
  crearUsuarioOK: boolean = false;
  editUsuarioOK: boolean = false;
  p = 1;

  @ViewChild("modalEditUser", { static: false })
  public modalEditUser: ModalDirective;
  @ViewChild("modalNewUser", { static: false })
  public modalNewUser: ModalDirective;
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private reporteService: ReporteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.crearFormularioConsulta();
    this.listarUsuarios();
  }

  // Metodo para creacion de reactiveForm
  crearFormularioConsulta() {
    this.usuarioForm = this.fb.group({
      filterCodUser: new FormControl(""),
      filterEmailUser: new FormControl(""),
      filterRolUser: new FormControl(""),
      filterNombreUser: new FormControl(""),
      filterPaternoUser: new FormControl(""),
      filterMaternoUser: new FormControl(""),
      filterEstado: new FormControl(""),
    });
  }

  exportarExcel() {
    // Eliminamos los elementos que no deseamos mostrar en el reporte
    Constant.REPORT.forEach((res) => delete res.password && res.firstLogin);
    this.reporteService.exportAsExcelFile("REPORTE USUARIOS");
  }

  exportarPDF() {
    // Eliminamos los elementos que no deseamos mostrar en el reporte
    Constant.REPORT.forEach((res) => delete res.password && res.firstLogin);
    const encabezado = [
      "CODIGO",
      "EMAIL",
      "ROL",
      "CREACION",
      "MODIFICACION",
      "NOMBRES",
      "APELLIDO PATERNO",
      "APELLIDO MATERNO",
      "ESTADO",
    ];
    this.reporteService.exportAsPDF("REPORTE USUARIOS", encabezado);
  }

  // Metodo que llama al modal componente hijo edituser
  editarUsuario(user) {
    this.userSeleccionado = user;
    this.modalEditUser.show();
    this.editUsuarioOK = true;
  }

  onChangeForm() {
    this.p = 1;
  }

  // Metodo que llama al servicio getAllUsers
  listarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listaUsuariosOk = true;
        this.listaUsuarios = res;
      },
      error: (_err) => {
        this.toastrService.error("Error al listar usuarios");
      },
    });
  }

  // Llamada al servicio resetear contraseña
  resetearUsuario(user) {
    this.userService.resetPassword(user).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.listarUsuarios();
          this.toastrService.success(
            "Se reseteo exitosamente la contraseña",
            "Exito"
          );
        } else {
          this.toastrService.error(
            "Sucedio un error al resetear la contraseña " + res.message,
            "Error"
          );
        }
      },
      error: (err) => {
        this.toastrService.error(
          "Sucedio un error al resetear el usuario " + err,
          "Error"
        );
      },
    });
  }

  // Metodo que llama al servicio eliminar usuario
  eliminarUsuario(id) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.listarUsuarios();
          this.p = 1;
          this.toastrService.success(
            "Se elimino exitosamente el usuario",
            "Exito"
          );
        } else {
          this.toastrService.error(
            "Sucedio un error al eliminar al usuario : " + res.message,
            "Error"
          );
        }
      },
      error: (err) => {
        this.toastrService.error(
          "Sucedio un error al eliminar el usuario " + err,
          "Error"
        );
      },
    });
  }

  // Metodo que llama al componente modal hijo crear user
  crearUsuario() {
    this.modalNewUser.show();
    this.crearUsuarioOK = true;
  }

  // Alerta de reseteo de usuario
  alertResetUser(username) {
    Swal.fire({
      title: "Reseteo de contraseña de usuario",
      text:
        "Se va resetear la contraseña del usuario " +
        username +
        " ¿Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Caso de aceptar se llama al servicio de reseteo de contraseña de usuario y se envie el email respectivo
        const user = {
          username: username,
        };
        this.resetearUsuario(user);
      }
    });
  }

  // Alerta de eliminacion de usuario
  alertDeleteUser(user) {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "Se va eliminar al usuario " + user.username + " ¿Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Caso de aceptar se llama al servicio de eliminar usuario
        this.eliminarUsuario(user.id);
      }
    });
  }
}
