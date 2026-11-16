import Movimientos from "./components/Movimientos";
import Resumen from "./components/Resumen";
import Formulario from "./components/FormularioMovimientos";
import { useEffect, useState } from "react";
import type { Movimiento } from "./types/movimientos";

type TipoFiltro = "todos" | Movimiento["tipo"];

function App() {
  const movimientosFijos: Movimiento[] = [
    { id: 1, monto: 800, descripcion: "Transferencia", tipo: "Ingreso", fecha: "2026-10-12", categoria: "Otro" },
    { id: 2, monto: 500, descripcion: "Comida", tipo: "Gasto", fecha: "2026-10-12", categoria: "Alimentacion" },
    { id: 3, monto: 80, descripcion: "Transporte", tipo: "Gasto", fecha: "2026-10-12", categoria: "Transporte" },
  ];

  const [movimientos, setMovimientos] = useState<Movimiento[]>(datosGuardados);

  useEffect(() => {
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
  }, [movimientos]);

  function datosGuardados() {
    try {
      const datos = localStorage.getItem("movimientos");
      if (datos) return JSON.parse(datos);
      return movimientosFijos;
    } catch {
      return movimientosFijos;
    }
  }

  function agregarMovimiento(movimiento: Movimiento) {
    setMovimientos((estadoAnterior) => [...estadoAnterior, movimiento]);
  }

  const gastos = movimientos
    .filter((mov) => mov.tipo === "Gasto")
    .reduce((acumulador, gasto) => acumulador + gasto.monto, 0);

  const ingresos = movimientos
    .filter((mov) => mov.tipo === "Ingreso")
    .reduce((acumulador, ingreso) => acumulador + ingreso.monto, 0);

  const deleteRegister = (id: number) => {
    setMovimientos(movimientos.filter((mov) => mov.id !== id));
  };

  const editRegister = (id: number, nuevosDatos: Omit<Movimiento, "id">) => {
    setMovimientos(
      movimientos.map((mov) => (mov.id === id ? { ...mov, ...nuevosDatos } : mov))
    );
  };

  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtro, setFiltro] = useState<TipoFiltro>("todos");

  const listaCategorias = Array.from(new Set(movimientos.map((mov) => mov.categoria)));

  const listaFiltrada = filtrarTipo(filtro, filtroCategoria);
  function filtrarTipo(tipo: TipoFiltro, categoria: string) {
    return movimientos.filter(
      (mov) =>
        (tipo === "todos" || mov.tipo === tipo) &&
        (categoria === "todos" || mov.categoria === categoria)
    );
  }

  const navItems = [
    { label: "Inicio", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Layout responsive: sidebar en desktop, contenido + nav inferior en móvil */}
      <div className="mx-auto flex max-w-6xl md:gap-6">
        {/* Sidebar (solo desktop) */}
        <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-outline/40 p-6 md:flex md:min-h-screen">
          <h1 className="font-display text-2xl font-bold text-primary">Pilas</h1>
          <nav className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 rounded-pill px-4 py-2 text-left font-semibold transition ${
                  i === 0 ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-alt"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-10">
          {/* Header móvil */}
          <header className="mb-6 flex items-center justify-between md:hidden">
            <div>
              <p className="text-sm text-muted">Buenos días</p>
              <h1 className="font-display text-2xl font-bold text-foreground">Licenia</h1>
            </div>
            <span className="rounded-pill bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
              Inicio
            </span>
          </header>

          {/* Saludo desktop */}
          <div className="mb-6 hidden md:block">
            <p className="text-muted">Buenos días</p>
            <h2 className="font-display text-3xl font-bold">Licenia</h2>
          </div>

          <div className="space-y-6">
            <Resumen saldo={ingresos - gastos} ingresos={ingresos} gastos={gastos} />

            <section className="rounded-card border border-outline/40 bg-surface p-4 shadow-sm md:p-6">
              <Formulario agregarMovimiento={agregarMovimiento} />
            </section>

            <section className="rounded-card border border-outline/40 bg-surface p-4 shadow-sm md:p-6">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="font-display text-xl font-bold">Últimos movimientos</h2>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="flex flex-col text-sm text-muted">
                    Categoría
                    <select
                      className="mt-1 rounded-xl border border-outline/50 bg-surface-alt px-3 py-2 text-foreground"
                      value={filtroCategoria}
                      onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                      <option value="todos">Todas</option>
                      {listaCategorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col text-sm text-muted">
                    Tipo
                    <select
                      className="mt-1 rounded-xl border border-outline/50 bg-surface-alt px-3 py-2 text-foreground"
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value as TipoFiltro)}
                    >
                      <option value="todos">Todos</option>
                      <option value="Ingreso">Ingreso</option>
                      <option value="Gasto">Gasto</option>
                    </select>
                  </label>
                </div>
              </div>

              {listaFiltrada.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline/60 bg-surface-alt/50 px-6 py-10 text-center">
                  <span className="mb-2 text-3xl">🌸</span>
                  <p className="font-display text-lg font-semibold text-foreground">No hay coincidencias</p>
                  <p className="mt-1 text-sm text-muted">Prueba cambiando los filtros o agrega un nuevo movimiento.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {listaFiltrada.map((movimiento) => (
                    <Movimientos
                      key={movimiento.id}
                      id={movimiento.id}
                      monto={movimiento.monto}
                      descripcion={movimiento.descripcion}
                      categoria={movimiento.categoria}
                      tipo={movimiento.tipo}
                      fecha={movimiento.fecha}
                      onDelete={deleteRegister}
                      onEdit={editRegister}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Nav inferior (solo móvil) */}
      <nav className="fixed inset-x-0 bottom-0 border-t border-outline/40 bg-surface/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              className={`flex min-w-16 flex-col items-center gap-0.5 rounded-2xl px-3 py-1 text-xs font-semibold ${
                i === 0 ? "text-primary" : "text-muted"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
