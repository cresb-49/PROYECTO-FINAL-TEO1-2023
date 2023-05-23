export class Entrada {
    constructor(
        public inicio: boolean = false,
        public letra: string = "",
        public entrada: string = "",
        public numeroHorizontal: number = 0,
        public numeroVertical: number = 0,
        public coordenada: { x: number, y: number } = { x: 0, y: 0 }
    ) { }
}
