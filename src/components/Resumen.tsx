
function Resumen(props) {
  return (
    <div className="tarjeta-resumen">
      <div>
      <h3>Saldo disponible</h3>
      <p>{props.saldo}</p>
      </div>
      <div>
        <h3>Ingresos</h3>
        <p>{props.ingresos}</p>
      </div>
      <div>
      <h3>Gastos</h3>
      <p>{props.gastos}</p>
      </div>
    </div>
  )
}

export default Resumen
