import { catchError } from 'rxjs/operators';
import { timer, throwError } from 'rxjs';
import { ProductoService } from './../../services/producto.service';
import { VentaService } from './../../services/venta.service';
import { VentaStatus, Venta, DetalleVenta } from './../../models/venta';
import { Producto, ProductoStatus } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rol = '';
  alertStyle = '';
  ventaStatus = new VentaStatus('', '');
  productos: Producto[];
  productoSeleccionado: Producto;
  itemsCarritoCompra: Producto[] = [];
  verCarritoCompras = false;
  productoStatus = new ProductoStatus('', '');
  productoIn: Producto;

  regiones: Producto[];


  constructor(public productoService: ProductoService, private ventaService: VentaService) { }

  ngOnInit() {
    this.getProductos();

    const source = timer(1000)
      .subscribe(t => {
        this.rol = localStorage.getItem('HulkStore-Rol');
        if (!this.rol) {
          this.verCarritoCompras = false;
          this.alertStyle = '';
        }
      }
      );
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      productos => {
        const respuesta: any = productos;
        this.productos = respuesta.data;
      }
      ,
      error => {
        console.error('Ocurrio un error al obtener la lista de productos, navigating to login: ', error);
      }
    );
  }

  seleccionarArticulo(producto: Producto) {
    this.productoSeleccionado = producto;
    console.log('1-------------------->producto ' + this.productoSeleccionado.id);
  }

  addArticulo() {
    for (const prod of this.productos) {
      if (prod.id === this.productoSeleccionado.id) {
        console.log('xxxxxxxxxxxxx ' + prod.cantidad);
        if (prod.cantidad > 0) {
          prod.cantidad = prod.cantidad - 1;
        } else{
          Swal.fire('Sin stock', 'El producto seleccionado no tiene stock disponible!', 'info');
          return;
        }
      }
    }

    /*this.productoIn = new Producto(0, ' ', ' ', ' ', 0, 0, ' ');
    this.productoIn = this.productoSeleccionado;
    this.productoIn.cantidad = 1;

    if (this.existeItem(this.productoSeleccionado.id)) {
      this.incrementaCantidad(this.productoSeleccionado.id);
    } else {*/
    this.itemsCarritoCompra.push(this.productoSeleccionado);
    // }



  }

  clickVerCarritoCompras() {
    this.verCarritoCompras = true;
  }


  realizarCompra() {
    console.log('2-------------------->ver carrito de compras ');
    const detalleVenta: any[] = [];
    let subtotal = 0;
    for (const prod of this.itemsCarritoCompra) {
      const detalle = new DetalleVenta({ id: prod.id }, 1, prod.precio, prod.precio * 1);
      subtotal = subtotal + prod.precio * 1;
      detalleVenta.push(detalle);
    }
    const usuarioId = localStorage.getItem('HulkStore-UsuarioID');
    const iva = subtotal * 0.12;
    const total = subtotal + iva;
    const venta = new Venta('', '', subtotal, iva, total, { id: parseInt(usuarioId, 10) }, detalleVenta);
    this.ventaService.realizarCompra(venta)
      .subscribe((status: VentaStatus) => {
        Swal.fire('Compra', 'Se realizó la compra correctamente.', 'success');

        this.getProductos();
        this.itemsCarritoCompra = [];
        this.verCarritoCompras = false;

      }),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Compra', 'Error en la compra!', 'error');
        return throwError(e);
      });
  }

  public removerProducto(id: number): void {
    this.itemsCarritoCompra = this.itemsCarritoCompra.filter((item: Producto) => id !== item.id);
  }


  existeItem(id: number): boolean {
    let existe = false;
    this.itemsCarritoCompra.forEach((item: Producto) => {
      if (id === item.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.itemsCarritoCompra = this.itemsCarritoCompra.map((item: Producto) => {
      console.log(item);
      if (id === item.id) {
        ++item.cantidad;
      }
      return item;
    });

  }

}
