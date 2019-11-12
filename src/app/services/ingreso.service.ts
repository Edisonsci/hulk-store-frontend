import { Ingreso, IngresoStatus } from './../models/ingreso';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  private urlEndPoint = 'http://localhost:8080/ingreso';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }
  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(this.urlEndPoint).pipe(
      catchError(e => {
        this.router.navigate(['/ingreso']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  guardarIngreso(newIngreso: Ingreso): Observable<IngresoStatus> {
    return this.http.post(this.urlEndPoint, newIngreso, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.ingreso as IngresoStatus),
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

  deleteIngreso(idIngreso: number): Observable<Ingreso> {
    return this.http.delete<Ingreso>(`${this.urlEndPoint}/${idIngreso}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
