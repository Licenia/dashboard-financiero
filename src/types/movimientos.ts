
export type Movimiento = {
    id: number
    monto: number
    descripcion: string
    tipo: "ingreso" | "gasto"
}