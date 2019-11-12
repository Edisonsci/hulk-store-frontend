export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public categoria: any,
        public precio: number,
        public cantidad: number,
        public url: string
    ) { }
}


export class ProductoStatus {
    constructor(
        public codigo: string,
        public mensaje: string
    ) { }
}