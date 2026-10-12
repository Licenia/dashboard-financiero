import { useState } from "react";
import type { Movimiento } from "../types/movimientos";

export type MovimientosProps = {
  id: number;
  monto: number;
  descripcion: string;
<<<<<<< HEAD
  tipo: string;
  onDelete: (id: number) => void;
  onEdit: ();
  onCancel: ();
=======
  tipo: "ingreso" | "gasto";
  onDelete: (id: number) => void;
  onEdit: (id: number, nuevosDatos: Omit<Movimiento, "id">) => void;
>>>>>>> aa0e7495dad19219f10c93c14f5b489b46673aa4
};

function Movimientos(props: MovimientosProps) {
  const [editando, setEditando] = useState(false);
  const [descripcionEditar, setDescripcionEditar] = useState(props.descripcion);
  const [montoEditar, setMontoEditar] = useState(props.monto);
  const [tipoEditar, setTipoEditar] = useState(props.tipo);
  return (
    <div>
      <ul className="list">
        <li>
<<<<<<< HEAD
          {props.monto} {props.descripcion} {props.tipo}
          <img width="20" height="20" src="https://img.icons8.com/ios/50/create-new.png" alt="create-new" onClick={() => props.onEdit(props.id)} />
          <img className="btn-delete" width="20" height="20" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" onClick={() => props.onDelete(props.id)} />
=======
          {props.monto} {props.descripcion}{" "}
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
                value={tipoEditar}
                onChange={(e) =>
                  setTipoEditar(e.target.value as "ingreso" | "gasto")
                }
              >
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>

              <button
                onClick={() => {
                  props.onEdit(props.id, {
                    descripcion: descripcionEditar,
                    monto: montoEditar,
                    tipo: tipoEditar,
                  });
                  setEditando(false);
                }}
              >
                Guardar
              </button>
              <button onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          ) : null}
>>>>>>> aa0e7495dad19219f10c93c14f5b489b46673aa4
        </li>
      </ul>
    </div>
  );
}

export default Movimientos;
