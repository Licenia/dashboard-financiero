import Movimientos from "./components/Movimientos";
import Resumen from "./components/Resumen";
import Formulario from "./components/FormularioMovimientos";

function App() {
  const movimientos = [
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
  ];

  const gastos = movimientos
    .filter((movimiento) => movimiento.tipo === "gasto")
    .reduce((acumulador, gasto) => acumulador + gasto.monto, 0);

  const ingresos = movimientos
    .filter((movimientos) => movimientos.tipo === "ingreso")
    .reduce((acumulador, ingreso) => acumulador + ingreso.monto, 0);

  return (
    <>
      <nav className="nav-options">
        <h1>Banco Digital</h1>
        <ul className="list">
          <li> 👤Licenia</li>
        </ul>
      </nav>
      <section>
        <Formulario agregarMovimiento={agregarMovimiento}/>
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

function agregarMovimiento(movimiento) {
  console.log(movimiento)
}

export default App;
