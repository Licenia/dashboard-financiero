import { useState } from "react";
import type { Movimiento } from "../types/movimientos";

export type MovimientosProps = {
  id: number;
  monto: number;
  descripcion: string;
  tipo: "Ingreso" | "Gasto";
  fecha: string;
  categoria: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, nuevosDatos: Omit<Movimiento, "id">) => void;
};

function formatearFecha(fecha: string): string {
  if (!fecha) return "";
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

function Movimientos(props: MovimientosProps) {
  const [editando, setEditando] = useState(false);
  const [descripcionEditar, setDescripcionEditar] = useState(props.descripcion);
  const [montoEditar, setMontoEditar] = useState(props.monto);
  const [tipoEditar, setTipoEditar] = useState(props.tipo);
  const [fechaEditar, setFechaEditar] = useState(props.fecha);
  const [categoriaEditar, setCategoriaEditar] = useState(props.categoria);
  const [error, setError] = useState("");

  function validaciones() {
    setError("");
    const montoNumerico = Number(montoEditar);
    const cadenaLimpia = descripcionEditar.trim();
    if (cadenaLimpia === "") {
      setError("Ingresa una descripción");
      return false;
    }
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setError("El monto debe ser mayor que 0");
      return false;
    }
    return true;
  }

  const esIngreso = props.tipo === "Ingreso";
  const inputCls =
    "rounded-xl border border-outline/50 bg-surface-alt px-3 py-2 text-sm text-foreground outline-none transition-all duration-200 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <article className="rounded-2xl border border-outline/40 bg-surface-alt/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-outline/60 hover:bg-surface-alt hover:shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
              esIngreso ? "bg-income-soft text-income" : "bg-expense-soft text-expense"
            }`}
          >
            {esIngreso ? "↓" : "↑"}
          </div>
          <div>
            <p className="font-semibold text-foreground">{props.descripcion}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="rounded-pill bg-secondary-soft px-2 py-0.5 font-medium text-secondary">
                {props.categoria}
              </span>
              <span>{formatearFecha(props.fecha)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className={`font-display text-lg font-bold ${esIngreso ? "text-income" : "text-expense"}`}>
            {esIngreso ? "+" : "-"}${props.monto.toFixed(2)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setEditando((v) => !v)}
              className="rounded-pill border border-outline/50 px-3 py-1 text-sm font-medium text-muted transition-all duration-200 hover:bg-surface hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {editando ? "Cerrar" : "Editar"}
            </button>
            <button
              type="button"
              aria-label="Eliminar movimiento"
              onClick={() => {
                if (confirm("¿Estás seguro de que deseas eliminar este movimiento?")) {
                  props.onDelete(props.id);
                }
              }}
              className="rounded-pill border border-expense/20 px-3 py-1 text-sm font-medium text-expense transition-all duration-200 hover:bg-expense-soft focus:outline-none focus:ring-2 focus:ring-expense/20"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {editando && (
        <div className="mt-4 space-y-3 border-t border-outline/30 pt-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input className={inputCls} value={descripcionEditar} onChange={(e) => setDescripcionEditar(e.target.value)} />
            <input
              className={inputCls}
              type="number"
              value={montoEditar}
              onChange={(e) => setMontoEditar(Number(e.target.value))}
            />
            <select className={inputCls} value={categoriaEditar} onChange={(e) => setCategoriaEditar(e.target.value)}>
              <option value="Alimentacion">Alimentación</option>
              <option value="Transporte">Transporte</option>
              <option value="Vivienda">Vivienda</option>
              <option value="Salud">Salud</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Educacion">Educación</option>
              <option value="Otro">Otro</option>
            </select>
            <select
              className={inputCls}
              value={tipoEditar}
              onChange={(e) => setTipoEditar(e.target.value as "Ingreso" | "Gasto")}
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </select>
            <input className={inputCls} type="date" value={fechaEditar} onChange={(e) => setFechaEditar(e.target.value)} />
          </div>
          {error && <p className="text-sm font-medium text-expense">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (!validaciones()) return;
                props.onEdit(props.id, {
                  descripcion: descripcionEditar,
                  monto: montoEditar,
                  tipo: tipoEditar,
                  fecha: fechaEditar,
                  categoria: categoriaEditar,
                });
                setEditando(false);
              }}
              className="rounded-pill bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditando(false)}
              className="rounded-pill border border-outline/50 px-4 py-1.5 text-sm font-medium text-muted transition-all duration-200 hover:bg-surface-alt hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default Movimientos;
