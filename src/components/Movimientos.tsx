type MovimientosProps = {
  id: number;
  monto: number;
  descripcion: string;
  tipo: string;
  onDelete: (id: number) => void;
  onEdit: ();
  onCancel: ();
};

function Movimientos(props: MovimientosProps) {
  return (
    <div>
      <ul className="list">
        <li>
          {props.monto} {props.descripcion} {props.tipo}
          <img width="20" height="20" src="https://img.icons8.com/ios/50/create-new.png" alt="create-new" onClick={() => props.onEdit(props.id)} />
          <img className="btn-delete" width="20" height="20" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" onClick={() => props.onDelete(props.id)} />
        </li>
      </ul>
    </div>
  );
}

export default Movimientos;
