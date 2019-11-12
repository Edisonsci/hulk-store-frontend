import { CategoriaService } from './../../services/categoria.service';
import { catchError } from 'rxjs/operators';
import { Producto, ProductoStatus } from './../../models/producto';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  alertStyle = '';
  productoStatus = new ProductoStatus('', '');
  model = new Producto(0, '', '', '', 0, 0, '');
  public categorias = new Array();
  productos: Producto[];
  categoria = 'Seleccione Categoría';


  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.initProducto();
    this.getCategoria();
    this.getProductos();
  }

  private initProducto() {
    this.alertStyle = '';
    this.productoStatus.codigo = '';
    this.productoStatus.mensaje = '';
  }


  public removerProducto(id) {
    this.productoService.deleteProducto(id)
      .subscribe((res: any) => {
        this.getProductos();
        Swal.fire('Eliminar Producto', `Se eliminó el producto correctamente.` , 'success');
      },
        error => {
          console.error('Ocurrio un error al eliminar un producto, navigating to login: ', error);
        });
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
  getCategoria() {
    this.categoriaService.getCategoria()
      .subscribe((categorias: any) => {
        this.categorias = categorias;
      },
        error => {
          console.error('Ocurrio un error al obtener la lista de categorias de productos, navigating to login: ', error);
        });
  }

  guardarProducto() {

    if (this.model.precio === 0) {
      Swal.fire('Ingreso Producto', 'Precio debe ser mayor a 0!' , 'info');
      return;
    }

    if (this.model.cantidad === 0) {
      Swal.fire('Ingreso Producto', 'Cantidad debe ser mayor a 0!' , 'info');
      return;
    }


    this.model.categoria = { codigo: this.categoria };
    this.productoService.guardarProducto(this.model)
      .subscribe((status: ProductoStatus) => {
        this.resetProducto();
        Swal.fire('Ingreso Producto', 'Se ha ingresado el producto correctamente.', 'success');
      })
      ,
      catchError(e => {
        Swal.fire('Ingresos', `Ya existe un registro con el mismo nombre.` , 'error');
        return throwError(e);
      });
  }

  private resetProducto() {
    this.getProductos();
    this.model = new Producto(0, ' ', ' ', ' ', 0, 0, ' ');
    this.categoria = 'Seleccione Categoría';
  }

  cancelar() {
    this.resetProducto();
    this.initProducto();
    this.productoStatus.codigo = null;
  }

}
