import Movimientos from "./components/Movimientos";
import Resumen from "./components/Resumen";
import Formulario from "./components/FormularioMovimientos";
import { useState } from "react";
import type { Movimiento } from "./types/movimientos";

function App() {
  // estado inicial de movimientos
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    {
      id: 1,
      monto: 800,
      descripcion: "Transferencia",
      tipo: "ingreso",
    },
    {
      id: 2,
      monto: 500,
      descripcion: "Comida",
      tipo: "gasto",
    },
    {
      id: 3,
      monto: 80,
      descripcion: "Transporte",
      tipo: "gasto",
    },
  ]);

  // agrega un nuevo movimiento al estado
  function agregarMovimiento(movimiento: Movimiento) {
    setMovimientos((estadoAnterior) => [...estadoAnterior, movimiento]);
  }
  // filtra  y suma los montos de gastos e ingresos
  const gastos = movimientos
    .filter((mov) => mov.tipo === "gasto")
    .reduce((acumulador, gasto) => acumulador + gasto.monto, 0);

  const ingresos = movimientos
    .filter((mov) => mov.tipo === "ingreso")
    .reduce((acumulador, ingreso) => acumulador + ingreso.monto, 0);

  return (
    <>
      <nav className="nav-options">
        <h1>Finanzas Personales</h1>
        <ul className="list">
          <li> 👤Licenia</li>
        </ul>
      </nav>
      <section>
        <Formulario agregarMovimiento={agregarMovimiento} />
      </section>
      <section className="container">
        <div>
          <ul className="list">
            <li>Dashboard</li>
            <li>Movimientos</li>
            <li>Transferir</li>
            <li>Configuracion</li>
          </ul>
        </div>
        <div>
          <h2>Buenos dias, Licenia</h2>
          <Resumen
            saldo={ingresos - gastos}
            ingresos={ingresos}
            gastos={gastos}
          />
          <h2> Ultimos movimientos</h2>
          {movimientos.map((movimiento) => (
            <Movimientos
              key={movimiento.id}
              monto={movimiento.monto}
              descripcion={movimiento.descripcion}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
