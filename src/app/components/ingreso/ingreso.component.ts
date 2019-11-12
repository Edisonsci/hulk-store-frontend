import { Producto } from './../../models/producto';
import { ProductoService } from './../../services/producto.service';
import { IngresoService } from './../../services/ingreso.service';
import { Ingreso, IngresoStatus } from './../../models/ingreso';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent implements OnInit {

  alertStyle = '';
  ingresoStatus = new IngresoStatus('', '');
  model = new Ingreso(0, 0, '', '', 0, '', 0);

  productos: Producto[];
  ingresos: Ingreso[];
  producto = 'Seleccione Producto';

  constructor(private ingresoService: IngresoService, private productoService: ProductoService) { }

  ngOnInit() {
    this.initIngreso();
    this.getProductos();
    this.getIngresos();
  }

  private initIngreso() {
    this.alertStyle = '';
    this.ingresoStatus.codigo = '';
    this.ingresoStatus.mensaje = '';
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

  getIngresos() {
    this.ingresoService.getIngresos().subscribe(
      ingreso => {
        const respuesta: any = ingreso;
        this.ingresos = respuesta.data;
      },
      error => {
        console.error('Ocurrio un error al obtener la lista de ingresos, navigating to login: ', error);
      });
  }

  onChange(evt: any) {
    for (const prod of this.productos) {
      if (prod.id === parseInt(evt, 10)) {
        this.model.precio = prod.precio;
      }
    }
  }

  onChangeCantidad() {
    this.model.total = this.model.precio * this.model.cantidad;
  }

  guardarIngreso() {
    this.model.producto = { id: this.producto };
    this.model.usuario = { id: 1 };

    console.log(this.model);

    this.ingresoService.guardarIngreso(this.model)
      .subscribe((status: IngresoStatus) => {
        this.resetIngreso();
        Swal.fire('Ingresos', `Se ha ingresado el producto correctamente.` , 'success');
      },
      error => {
        Swal.fire('Ingresos', `Ya existe un registro con el mismo nombre.` , 'error');
      });
  }

  private resetIngreso() {
    this.getIngresos();
    this.model = new Ingreso(0, 0, '', '', 0, '', 0);
    this.producto = 'Seleccione Producto';
  }

  public removerIngreso(id) {
    this.ingresoService.deleteIngreso(id)
      .subscribe((res: any) => {
        this.getIngresos();
        Swal.fire('Elimina Ingresos', `Se eliminó el producto correctamente.` , 'success');
      },
      error => {
        console.error('Ocurrio un error al eliminar un ingreso, navigating to login: ', error);
      });
  }

  cancelar() {
    this.resetIngreso();
    this.initIngreso();
    this.ingresoStatus.codigo = null;
  }

}
