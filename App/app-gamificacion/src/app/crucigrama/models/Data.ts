import { Entrada } from "./Entrada";
import { Pista } from "./Pistas";

export class Data {
    constructor(
        public matriz: Array<Array<Entrada>>,
        public pistasH: Array<Pista>,
        public pistasV: Array<Pista>
    ) { }
}
