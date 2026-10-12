import { useState } from "react";
import type { Movimiento } from "../types/movimientos";

function Formulario({
  agregarMovimiento,
}: {
  agregarMovimiento: (movimiento: Movimiento) => void;
}) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"ingreso" | "gasto">("ingreso");
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
    };


    // Se envía el objeto con los datos del formulario al componente padre
    agregarMovimiento(obj);

    // Limpia los inputs
    setDescripcion("");
    setMonto("");
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
      <label>Tipo:</label>
      <select
        value={tipo}
        onChange={(evento) =>
          setTipo(evento.target.value as "ingreso" | "gasto")
        }
      >
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}

export default Formulario;
