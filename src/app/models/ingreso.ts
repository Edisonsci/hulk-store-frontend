export class Ingreso {
    constructor(
        public id: number,
        public cantidad: number,
        public fecha: string,
        public producto: any,
        public total: number,
        public usuario: any,
        public precio: number
    ) { }
}


export class IngresoStatus {
    constructor(
        public codigo: string,
        public mensaje: string
    ) { }
}