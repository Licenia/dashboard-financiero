type MovimientosProps = {
  monto: number;
  descripcion: string;
};

function Movimientos(props: MovimientosProps) {
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
