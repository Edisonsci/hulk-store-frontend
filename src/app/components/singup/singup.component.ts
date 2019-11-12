import { UsuarioService } from './../../services/usuario.service';
import { LoginStatus, Registro } from './../../models/login';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  alertStyle = '';
  loginStatus = new LoginStatus('', '');
  model = new Registro('', '', '', '', '', '', '');

  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onRegister() {
    this.model.rol = { id: 3 };

    this.usuarioService.guardarUsuario(this.model)
      .subscribe((status: LoginStatus) => {
        this.router.navigateByUrl('/singin');
        Swal.fire('Login', `Se ha creado el usuario correctamente.` , 'success');
      },
        error => {
          Swal.fire('Ingresos', `Ya existe un registro con su correo!` , 'error');
        });
  }

}
