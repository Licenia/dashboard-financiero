import { useState } from "react";
import type { Movimiento } from "../types/movimientos";

function Formulario({
  agregarMovimiento,
}: {
  agregarMovimiento: (movimiento: Movimiento) => void;
}) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"Ingreso" | "Gasto">("Gasto");
  const [categoria, setCategoria] = useState("Alimentacion");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const manejarEnvio = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const montoNumerico = parseFloat(monto);
    const cadenaLimpia = descripcion.trim();

    if (cadenaLimpia === "") {
      setError("Ingresa una descripción");
      return;
    }
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setError("El monto debe ser mayor que 0");
      return;
    }

    agregarMovimiento({
      id: Date.now(),
      descripcion: cadenaLimpia,
      monto: montoNumerico,
      tipo,
      fecha,
      categoria,
    });

    setDescripcion("");
    setMonto("");
    setFecha("");
    setCategoria("Alimentacion");
    setError("");
  };

  const inputCls =
    "w-full rounded-xl border border-outline/50 bg-surface-alt px-3 py-2 text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline";

  return (
    <form onSubmit={manejarEnvio} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-foreground">Nuevo movimiento</h2>
        <div className="inline-flex rounded-pill bg-surface-alt p-1">
          {(["Gasto", "Ingreso"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={`rounded-pill px-4 py-1.5 text-sm font-semibold transition ${
                tipo === t
                  ? t === "Ingreso"
                    ? "bg-income-soft text-income"
                    : "bg-expense-soft text-expense"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-expense-soft px-3 py-2 text-sm font-medium text-expense">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-muted">
          Descripción
          <input
            className={inputCls}
            placeholder="Ej. Supermercado"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-muted">
          Monto
          <input
            className={inputCls}
            type="number"
            step="0.01"
            placeholder="0.00"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-muted">
          Fecha
          <input
            className={inputCls}
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-muted">
          Categoría
          <select className={inputCls} value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="Alimentacion">Alimentación</option>
            <option value="Transporte">Transporte</option>
            <option value="Vivienda">Vivienda</option>
            <option value="Salud">Salud</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Educacion">Educación</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-pill bg-primary px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98] sm:w-auto"
      >
        Agregar movimiento
      </button>
    </form>
  );
}

export default Formulario;
