import { useState } from "react";
import type { Movimiento } from "../types/movimientos";

export type MovimientosProps = {
  id: number;
  monto: number;
  descripcion: string;
  tipo: "Ingreso" | "Gasto";
  fecha: string;
  categoria: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, nuevosDatos: Omit<Movimiento, "id">) => void;
};


function formatearFecha(fecha: string): string {
  if (!fecha) return "";

  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}


function Movimientos(props: MovimientosProps) {
  const [editando, setEditando] = useState(false);
  const [descripcionEditar, setDescripcionEditar] = useState(props.descripcion);
  const [montoEditar, setMontoEditar] = useState(props.monto);
  const [tipoEditar, setTipoEditar] = useState(props.tipo);
  const [fechaEditar, setFechaEditar] = useState(props.fecha);
  const [categoriaEditar, setCategoriaEditar] = useState(props.categoria);
  return (
    <div>
      <ul className="list">
        <li>
          {props.monto} {props.descripcion} {props.categoria} {props.tipo} {formatearFecha(props.fecha)}
          <img
            className="btn-delete"
            width="20"
            height="20"
            src="https://img.icons8.com/ios/50/delete--v1.png"
            alt="delete--v1"
            onClick={() => props.onDelete(props.id)}
          />
          <button onClick={() => setEditando(true)}>Editar</button>
          {editando ? (
            <div>
              <input
                value={descripcionEditar}
                onChange={(e) => setDescripcionEditar(e.target.value)}
              />

              <input
                type="number"
                value={montoEditar}
                onChange={(e) => setMontoEditar(Number(e.target.value))}
              />
              <select
                value={categoriaEditar}
                onChange={(e) =>
                  setCategoriaEditar(e.target.value)
                }
              >
                <option value="Alimentacion">Alimentacion</option>
                <option value="Transporte">Transporte</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Salud">Salud</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Educacion">Educacion</option>
                <option value="Otro">Otro</option>
              </select>

              <select
                value={tipoEditar}
                onChange={(e) =>
                  setTipoEditar(e.target.value as "Ingreso" | "Gasto")
                }
              >
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
              </select>
              <input type="date" value={fechaEditar} onChange={(e)=> setFechaEditar(e.target.value)}/>
              <button
                onClick={() => {
                  props.onEdit(props.id, {
                    descripcion: descripcionEditar,
                    monto: montoEditar,
                    tipo: tipoEditar,
                    fecha: fechaEditar,
                    categoria: categoriaEditar
                  });
                  setEditando(false);
                }}
              >
                Guardar
              </button>
              <button onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

export default Movimientos;
