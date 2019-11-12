import { catchError, map } from 'rxjs/operators';
import { Login, Registro, LoginStatus } from './../models/login';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint = 'http://localhost:8080/usuario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${login.email}/${login.password}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/usuario']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  guardarUsuario(newUser: Registro): Observable<LoginStatus> {
    console.log(newUser);
    return this.http.post(this.urlEndPoint, newUser, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.registro as LoginStatus),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }


}
