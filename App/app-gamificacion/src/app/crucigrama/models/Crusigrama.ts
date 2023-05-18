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
                    fila.push(new Cuadro());
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
}
