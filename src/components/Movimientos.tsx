type MovimientosProps = {
  id: number;
  monto: number;
  descripcion: string;
  onDelete: (id: number) => void;
};

function Movimientos(props: MovimientosProps) {
  return (
    <div>
      <ul className="list">
        <li>
          {props.monto} {props.descripcion} <img className="btn-delete" width="20" height="20" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1" onClick={() => props.onDelete(props.id)}/>
        </li>
      </ul>
    </div>
  );
}

export default Movimientos;
