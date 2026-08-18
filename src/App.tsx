import Movimientos from "./components/Movimientos"
import Resumen from "./components/Resumen"

function App() {

  const movimientos = [
    {
       id: 1,
       monto: 800,
       descripcion: "Transferencia"
     },
    {
       id: 2,
       monto: 500,
       descripcion: "Comida"
     },
    {
       id: 3,
       monto: 80,
       descripcion: "Transporte"
     }
  ]

  return (
    <>
      <nav className="nav-options">
        <h1>Banco Digital</h1>
        <ul className="list">
          <li> 👤Licenia</li>
        </ul>
      </nav>

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
            <Resumen/>
           <h2> Ultimos movimientos</h2>
          {movimientos.map((movimiento) => (
            <Movimientos key={movimiento.id} monto={movimiento.monto} descripcion={movimiento.descripcion} />
         ))}
        </div>
      </section>
    </>
  )
}

export default App
