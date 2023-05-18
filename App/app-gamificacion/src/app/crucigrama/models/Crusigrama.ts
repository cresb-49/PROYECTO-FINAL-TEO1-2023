import { Cuadro } from "./Cuadro";

export class Crusigrama {
    private initCreate = false;

    private matriz!: Array<Array<Cuadro>>;
    private sizeX: number = 5;
    private sizeY: number = 5;

    constructor() {
        this.matriz = [[], [], [], [], []];
        let cont = 0;
        for (const fila of this.matriz) {
            for (let i = 0; i < 5; i++) {
                let c = new Cuadro();
                c.setCordenada(i, cont);
                fila.push(c);
            }
            cont++;
        }
    }

    public getSize(): any {
        return { sizeX: this.sizeX, sizeY: this.sizeY }
    }

    public setNewSize(sizeX: number, sizeY: number) {
        let copiaX = this.sizeX;
        let copiaY = this.sizeY;

        this.sizeX = sizeX;
        this.sizeY = sizeY;

        let copiaM: any = this.matriz;
        this.matriz = [];
        for (let y = 0; y < this.sizeY; y++) {
            let fila = []
            for (let x = 0; x < this.sizeX; x++) {
                if (y < copiaY && x < copiaX) {
                    let ccopia: Cuadro = copiaM[y][x]
                    ccopia.setInicio(false);
                    fila.push(ccopia);
                } else {
                    let c = new Cuadro();
                    c.setCordenada(x, y);
                    fila.push(c);
                }
            }
            this.matriz.push(fila);
        }
    }

    public getMatriz(): Array<Array<Cuadro>> {
        return this.matriz;
    }

    public setMatriz(matriz: Array<Array<Cuadro>>): void {
        this.matriz = matriz;
    }

    public getSiguienteIzquierda(x: number, y: number): any {
        let xtmp = x - 1;
        console.log('entro', 0, xtmp, this.sizeX);
        if (xtmp >= 0 && xtmp < this.sizeX) {
            return this.matriz[y][xtmp];
        } else {
            return null;
        }
    }

    public getSiguienteDerecha(x: number, y: number): any {
        let xtmp = x + 1;
        if (xtmp >= 0 && xtmp < this.sizeX) {
            return this.matriz[y][xtmp];
        } else {
            return null;
        }
    }

    public getSiguienteArriba(x: number, y: number): any {
        let ytmp = y - 1;
        if (ytmp >= 0 && ytmp < this.sizeY) {
            return this.matriz[ytmp][x];
        } else {
            return null;
        }
    }

    public getSiguienteAbajo(x: number, y: number): any {
        let ytmp = y + 1;
        if (ytmp >= 0 && ytmp < this.sizeY) {
            return this.matriz[ytmp][x];
        } else {
            return null;
        }
    }

    public verificacionIzquierda(cuadro: Cuadro): boolean {
        let izquierda: Cuadro = this.getSiguienteIzquierda(cuadro.getCordenada().x, cuadro.getCordenada().y);
        if (izquierda !== null) {
            if (izquierda.getInicio()) {
                return true;
            } else {
                return this.verificacionIzquierda(izquierda);
            }
        } else {
            return false
        }
    }

    public verificacionArriba(cuadro: Cuadro): boolean {
        let arriba: Cuadro = this.getSiguienteArriba(cuadro.getCordenada().x, cuadro.getCordenada().y);
        if (arriba !== null) {
            if (arriba.getInicio()) {
                return true;
            } else {
                return this.verificacionArriba(arriba);
            }
        } else {
            return false;
        }
    }

    public isInitCreate(): boolean {
        return this.initCreate;
    }

    public setInitCreate(initCreate: boolean): void {
        this.initCreate = initCreate;
    }

    public verificar(): any {
        let errores: Array<any> = [];
        let cont: number = 0;
        for (const fila of this.matriz) {
            for (const cuadro of fila) {
                if (cuadro.getInicio()) {
                    console.log('casilla inicio no hay verificacion');
                } else {
                    if (cuadro.getLetra() !== "") {
                        cont++;
                        let izquierda: Cuadro = this.getSiguienteIzquierda(cuadro.getCordenada().x, cuadro.getCordenada().y);
                        let arriba: Cuadro = this.getSiguienteArriba(cuadro.getCordenada().x, cuadro.getCordenada().y);
                        let derecha: Cuadro = this.getSiguienteDerecha(cuadro.getCordenada().x, cuadro.getCordenada().y);
                        let abajo: Cuadro = this.getSiguienteAbajo(cuadro.getCordenada().x, cuadro.getCordenada().y);

                        let up = (arriba !== null ? (arriba.getLetra() !== "" ? true : false) : false);
                        let down = (abajo !== null ? (abajo.getLetra() !== "" ? true : false) : false);
                        let left = (izquierda !== null ? (izquierda.getLetra() !== "" ? true : false) : false);
                        let rigth = (derecha !== null ? (derecha.getLetra() !== "" ? true : false) : false);

                        if ((rigth && !left) || (!up && down)) {
                            if (!cuadro.getInicio()) {
                                let error = { info: `La casilla de la fila ${cuadro.getCordenada().y + 1}, columna ${cuadro.getCordenada().x + 1} parece ser un inicio de paralabra pero no esta marcado` };
                                errores.push(error);
                            }
                        }

                        if (izquierda !== null) {
                            if (izquierda.getLetra() !== "") {
                                let resultIzquierda: boolean = this.verificacionIzquierda(cuadro);
                                if (!resultIzquierda) {
                                    let error = { info: `La casilla de la fila ${cuadro.getCordenada().y + 1}, columna ${cuadro.getCordenada().x + 1} no tiene inicio de palabra hacia la izquierda` };
                                    errores.push(error);
                                }
                            }
                        }
                        if (arriba !== null) {
                            if (arriba.getLetra() !== "") {
                                let resultArriva: boolean = this.verificacionArriba(cuadro);
                                if (!resultArriva) {
                                    let error = { info: `La casilla de la fila ${cuadro.getCordenada().y + 1}, columna ${cuadro.getCordenada().x + 1} no tiene inicio de palabra hacia arriva` };
                                    errores.push(error);
                                }
                            }
                        }
                    } else {
                        console.log('casilla vacia no hay verificacion');
                    }
                }
            }
        }
        if (cont < 1) {
            let error = { info: `No existen las suficientes letras para un crusigrama` };
            errores.push(error);
        }
        return errores;
    }

    public calculoPistasJuego(): Array<any> {
        let pistas: Array<any> = [];
        let numPistas: Object = { numV: 1, numH: 1 }

        for (const fila of this.matriz) {
            for (const cuadro of fila) {
                if (cuadro.getInicio()) {
                    let resultIzquierda: boolean = this.verificacionIzquierda(cuadro);
                    let resultArriva: boolean = this.verificacionArriba(cuadro);

                    let derecha: Cuadro = this.getSiguienteDerecha(cuadro.getCordenada().x, cuadro.getCordenada().y);
                    let abajo: Cuadro = this.getSiguienteAbajo(cuadro.getCordenada().x, cuadro.getCordenada().y);

                    let down = (abajo !== null ? (abajo.getLetra() !== "" ? true : false) : false);
                    let rigth = (derecha !== null ? (derecha.getLetra() !== "" ? true : false) : false);

                    this.calculoCompania(resultIzquierda, resultArriva, down, rigth, cuadro, numPistas)
                    pistas.push(cuadro);
                }
            }
        }
        return pistas;
    }

    private calculoCompania(initIzq: boolean, initArriba: boolean, down: boolean, rigth: boolean, cuadro: Cuadro, numPistas: any) {
        if (!down && !rigth) {
            console.log('error', cuadro);
        } else if (!down && rigth) {
            cuadro.setNumeroH(numPistas.numH);
            numPistas.numH = numPistas.numH + 1;
        } else if (down && !rigth) {
            cuadro.setNumeroV(numPistas.numV);
            numPistas.numV = numPistas.numV + 1;
        } else if (down && rigth) {
            if (!initIzq && !initArriba) {
                cuadro.setNumeroH(numPistas.numH);
                numPistas.numH = numPistas.numH + 1;
                cuadro.setNumeroV(numPistas.numV);
                numPistas.numV = numPistas.numV + 1;
            } else if (!initIzq && initArriba) {
                cuadro.setNumeroH(numPistas.numH);
                numPistas.numH = numPistas.numH + 1;
            } else if (initIzq && !initArriba) {
                cuadro.setNumeroV(numPistas.numV);
                numPistas.numV = numPistas.numV + 1;
            } else if (initIzq && initArriba) {
                console.log('error', cuadro);
            }
        }
    }
}
