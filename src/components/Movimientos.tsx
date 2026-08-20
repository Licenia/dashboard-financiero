type ResumenProps = {
  monto: number;
  descripcion: string;
};

function Movimientos(props: ResumenProps) {
  return (
    <div>
      <ul className="list">
        <li>
          {props.monto} {props.descripcion}
        </li>
      </ul>
    </div>
  );
}

export default Movimientos;
