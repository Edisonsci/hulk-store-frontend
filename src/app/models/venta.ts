
export class Venta {
  constructor(
    public nroDocumento: string,
    public fecha: string,
    public subtotal: number,
    public iva: number,
    public total: number,
    public usuario: any,
    public detalleList: DetalleVenta[]
  ) { }

}


export class DetalleVenta {
  constructor(
    public producto: any,
    public cantidad: number,
    public subtotal: number,
    public total: number
  ) { }


}


export class VentaStatus {
  constructor(
    public codigo: string,
    public mensaje: string
  ) { }
}
