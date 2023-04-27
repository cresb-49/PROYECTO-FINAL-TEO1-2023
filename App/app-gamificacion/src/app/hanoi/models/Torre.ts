import { Disco } from "./Disco";
export class Torre {
    nombre:string;
    discos:Disco[];
    constructor(nombre:string,discos:Disco[]) {
        this.nombre=nombre;
        this.discos=discos;
    }
}