import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Producto, ProductoStatus } from './../models/producto';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint = 'http://localhost:8080/producto';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }



  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint).pipe(
      catchError(e => {
         this.router.navigate(['/producto']);
         console.error(e.error.mensaje);
         Swal.fire('Error al cargar los productos', e.error.mensaje, 'error');
         return throwError(e);
      })
    );
  }


  guardarProducto(newProduct: Producto): Observable<ProductoStatus> {
    return this.http.post(this.urlEndPoint, newProduct, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.producto as ProductoStatus),
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

  deleteProducto(idProducto: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${idProducto}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        if (e.status == 409) {
          Swal.fire('Eliminar Producto', 'No se puede eliminar registro, tiene referencias de datos!', 'error');
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }



}
