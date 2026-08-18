function Movimientos(props) {
  return (
    <div>
      <ul className="list">
        <li>{props.monto} {props.descripcion}</li>
      </ul>
    </div>
  )
}

export default Movimientos
