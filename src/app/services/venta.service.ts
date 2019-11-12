import { Venta, VentaStatus } from './../models/venta';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private urlEndPoint = 'http://localhost:8080/venta';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  realizarCompra(newVenta: Venta): Observable<VentaStatus> {
    return this.http.post(this.urlEndPoint, newVenta, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.venta as VentaStatus),
        catchError(e => {

          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error);
          Swal.fire(e.error, e.error, 'error');
          return throwError(e);
        })
      );
  }

  getVentas(id): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


}
