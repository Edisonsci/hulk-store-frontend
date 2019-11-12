import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  granTotal: number;
  productos: Producto[];

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      productos => {
        const respuesta: any = productos;
        this.productos = respuesta.data;

        this.granTotal = 0;
        this.productos.forEach((item: Producto) => {
          this.granTotal += item.cantidad;
        });


      }
      ,
      error => {
        console.error('Ocurrio un error al obtener la lista de productos, navigating to login: ', error);
      }
    );
  }

}
