import { useState } from "react";

function Formulario(props) {
  const [descripcion, setDescripcion] = useState("")
  const [monto, setMonto] = useState("")
  const [tipo, setTipo] = useState("")

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    const obj = {
      descripcion,
      monto,
      tipo
    }

    agregarMovimiento(obj)
  }
  return (
  <form onSubmit={manejarEnvio}>
  <h2>Nuevo Movimientos</h2>
  <label>Descripcion </label>
      <input value={descripcion}
      onChange={(evento) => setDescripcion(evento.target.value)}
      />
      <label>Monto </label>
      <input value={monto}
      onChange={(evento) => setMonto(evento.target.value)}
      />
  <label>Tipo:</label>
  <select value={tipo} onChange={(evento)=> setTipo(evento.target.value)}>
    <option value="ingreso">Ingreso</option>
    <option value="gasto">Gasto</option>
      </select>
      <p>{descripcion} {monto} {tipo}</p>
    <button type="submit">Agregar</button>
  </form>
  )
}

export default Formulario;
