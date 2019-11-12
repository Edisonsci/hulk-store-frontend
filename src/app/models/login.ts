export class Login {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class LoginStatus {
    constructor(
        public codigo: string,
        public mensaje: string
    ) { }
}

export class Registro {
    constructor(
        public apellidos: string,
        public nombres: string,
        public correo: string,
        public password: string,
        public telefono: string,
        public direccion: string,
        public rol:any
    ) { }
}
