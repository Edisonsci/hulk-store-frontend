import { LoginService } from './../../services/login.service';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from './../../services/usuario.service';
import { Login, LoginStatus } from './../../models/login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  alertStyle = '';
  loginStatus = new LoginStatus('', '');
  model = new Login('', '');
  usuario: any;
  loading = false;
  rol = '';

  constructor(public usuarioService: UsuarioService, private router: Router,
              private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {

    this.rol = localStorage.getItem('HulkStore-Rol');
    console.log(this.rol);
    if (this.rol != null) {
      Swal.fire('Login', `Hola ${localStorage.getItem('HulkStore-Usuario')}, ya estas autenticado.`, 'info');
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.loading = true;
    this.usuarioService.login(this.model).subscribe(
      usuario => {
        const respuesta: any = usuario;
        if (respuesta == null) {
          this.model = new Login('', '');
          Swal.fire('Login', `Usuario o Password Incorrectos.`, 'error');
          this.router.navigate(['/singin']);
          this.loading = false;
          return;
        }
        this.usuario = respuesta.data;

        localStorage.setItem('HulkStore-Rol', this.usuario.rol);
        localStorage.setItem('HulkStore-UsuarioID', this.usuario.id);
        localStorage.setItem('HulkStore-Usuario', this.usuario.nombres + ' ' + this.usuario.apellidos);
        this.router.navigate(['/home']);
        Swal.fire('Login', `Hola ${this.usuario.nombres}, has iniciado sesión correctamente.`, 'success');
        this.loginService.notificarUpload.emit(this.usuario);
      }), catchError(e => {
        this.router.navigate(['/signin']);
        Swal.fire('Login', `Usuario o Password Incorrectos.`, 'error');
        this.loading = false;
        return throwError(e);
      });
  }

}
