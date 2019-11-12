import { VentaService } from './../../services/venta.service';
import { Venta } from './../../models/venta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras-realizadas',
  templateUrl: './compras-realizadas.component.html',
  styleUrls: ['./compras-realizadas.component.css']
})
export class ComprasRealizadasComponent implements OnInit {
  misCompras: Venta[];

  constructor(private ventaService: VentaService) { }

  ngOnInit() {
    this.getMisVentas();
  }

  getMisVentas() {
    const usuarioId = localStorage.getItem('HulkStore-UsuarioID');
    this.ventaService.getVentas(parseInt(usuarioId, 10)).subscribe(
      productos => {
        const respuesta: any = productos;
        this.misCompras = respuesta.data;
        console.log(this.misCompras);

      },
      error => {
        console.error('Ocurrio un error al obtener la lista de productos, navigating to login: ', error);
      });
  }
}
