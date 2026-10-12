import { useState } from "react";
import type { Movimiento } from "../types/movimientos";

function Formulario({
  agregarMovimiento,
}: {
  agregarMovimiento: (movimiento: Movimiento) => void;
}) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"Ingreso" | "Gasto">("Ingreso");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const manejarEnvio = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

      // Validaciones para todos los tipos de datos

      const montoNumerico = parseFloat(monto)
      const cadenaLimpia = descripcion.trim()

      if (cadenaLimpia === ""){
        setError("No ingreso la descripcion")
        return
      }

      if (isNaN(montoNumerico)  || montoNumerico <= 0  ){
        setError("EL monto debe ser un numero mayor que 0")
        return
      }

    const obj = {
      id: Date.now(),
      descripcion: cadenaLimpia,
      monto: montoNumerico,
      tipo,
      fecha,
      categoria
    };


    // Se envía el objeto con los datos del formulario al componente padre
    agregarMovimiento(obj);

    // Limpia los inputs
    setDescripcion("");
    setMonto("");
    setFecha("")
    setCategoria("")
    setError("")
  };

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Nuevo Movimientos</h2>
      { error !== "" && ( <p>{error}</p>) }
      <label>Descripcion </label>
      <input
        value={descripcion}
        onChange={(evento) => setDescripcion(evento.target.value)}
      />
      <label>Monto </label>
      <input
        value={monto}
        onChange={(evento) => setMonto(evento.target.value)}
      />
      <input type="date" value={fecha} onChange={(evento) => setFecha(evento.target.value)} required ></input>
      <label>Categoria:</label>
      <select
        value={categoria}
        onChange={(evento) =>
          setCategoria(evento.target.value)
        }
        required
      >
        <option value="Alimentacion">Alimentacion</option>
        <option value="Transporte">Transporte</option>
        <option value="Vivienda">Vivienda</option>
        <option value="Salud">Salud</option>
        <option value="Entretenimiento">Entretenimiento</option>
        <option value="Educacion">Educacion</option>
        <option value="Otro">Otro</option>
      </select>
      <label>Tipo:</label>
      <select
        value={tipo}
        onChange={(evento) =>
          setTipo(evento.target.value as "Ingreso" | "Gasto")
        }
        required
      >
        <option value="Ingreso">Ingreso</option>
        <option value="Gasto">Gasto</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}

export default Formulario;
