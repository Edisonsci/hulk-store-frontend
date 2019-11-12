import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Hulk Store';
  rol = '';
  usuario = '';
  usuarios: any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.rol = localStorage.getItem('HulkStore-Rol');
    this.usuario = localStorage.getItem('HulkStore-Usuario');

    this.loginService.notificarUpload.subscribe(cliente => {
      this.rol = cliente.rol;
      this.usuario = cliente.nombres + ' ' + cliente.apellidos;
    });
  }

  onLogout() {
    localStorage.clear();
    this.rol = '';
    this.usuario = '';
  }
}
