import Movimientos from "./components/Movimientos";
import Resumen from "./components/Resumen";
import Formulario from "./components/FormularioMovimientos";
import { useEffect, useState } from "react";
import type { Movimiento } from "./types/movimientos";

function App() {
  const movimientosFijos = [{
    id: 1,
    monto: 800,
    descripcion: "Transferencia",
    tipo: "Ingreso",
    fecha: "2026-10-12",
    categoria: "Otro"
  },
  {
    id: 2,
    monto: 500,
    descripcion: "Comida",
    tipo: "Gasto",
    fecha: "2026-10-12",
    categoria: "Alimentacion"
  },
  {
    id: 3,
    monto: 80,
    descripcion: "Transporte",
    tipo: "Gasto",
    fecha: "2026-10-12",
    categoria: "Transporte"
  }
  ]
  // estado inicial de movimientos
  const [movimientos, setMovimientos] = useState<Movimiento[]>(datosGuardados);

  useEffect(() => {
    const movimientosPersistentes = JSON.stringify(movimientos)
                  localStorage.setItem("movimientos", movimientosPersistentes)
  }, [movimientos])

  function datosGuardados() {
    try {
      const datos = localStorage.getItem("movimientos")
      if (datos) {
        return JSON.parse(datos)
      } else {
        return movimientosFijos
      }
    } catch{
       return movimientosFijos
    }
  }

  // agrega un nuevo movimiento al estado
  function agregarMovimiento(movimiento: Movimiento) {
    setMovimientos((estadoAnterior) => [...estadoAnterior, movimiento]);
  }
  // filtra  y suma los montos de gastos e ingresos
  const gastos = movimientos
    .filter((mov) => mov.tipo === "Gasto")
    .reduce((acumulador, gasto) => acumulador + gasto.monto, 0);

  const ingresos = movimientos
    .filter((mov) => mov.tipo === "Ingreso")
    .reduce((acumulador, ingreso) => acumulador + ingreso.monto, 0);

  // Funcion para eliminar movimientos registrados
  const deleteRegister = (id: number) => {
    const newRegister = movimientos.filter((mov) => mov.id !== id);
    setMovimientos(newRegister);
  };

  // Funcion para editar los movimientos registrados
  const editRegister = (id: number, nuevosDatos: Omit<Movimiento, "id">) => {
    const editMov = movimientos.map((mov) => {
      if (mov.id == id) {
        const nuevo = { ...mov, ...nuevosDatos };
        return nuevo;
      }
      return mov;
    });
    setMovimientos(editMov);
  };

  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [filtro, setFiltro] = useState("todos")

  const listaCategorias = Array.from(
    new Set(
      movimientos.map((mov)=> mov.categoria)
    )
  )


  // Funcion para filtrar por tipo de gasto
  const listaFiltrada = filtrarTipo(filtro, filtroCategoria)
  function filtrarTipo(tipo, categoria) {
  return movimientos.filter((mov) => (tipo === "todos" || mov.tipo === tipo)
    && (categoria === "todos" || mov.categoria === categoria))
  }


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
          <label>Filtrar por categoria: </label>
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="todos">Todas las categorias</option>
            {listaCategorias.map((categoria) => (
              <option value={categoria}>{categoria}</option>
            ))
            }
            </select>
          <label>Filtrar por tipo: </label>
          <select id="filtroEtiqueta" value={filtro} onChange={(e)=> setFiltro(e.target.value)}>
            <option value="todos">Mostrar todos</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </select>
          {
            listaFiltrada.length === 0 ?
              <p>No hay coincidencias </p>
              :
            listaFiltrada.map((movimiento) => (
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
      </section>
    </>
  );
}

export default App;
