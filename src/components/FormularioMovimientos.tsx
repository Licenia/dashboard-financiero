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

  const manejarEnvio = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const obj = {
      id: Date.now(),
      descripcion,
      monto: parseFloat(monto),
      tipo,
    };

    // Se envía el objeto con los datos del formulario al componente padre
    agregarMovimiento(obj);

    // Limpia los inputs
    setDescripcion("");
    setMonto("");
  };
  return (
    <form onSubmit={manejarEnvio}>
      <h2>Nuevo Movimientos</h2>
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
