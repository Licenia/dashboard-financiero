type ResumenProps = {
  saldo: number;
  ingresos: number;
  gastos: number;
};

function Resumen({ saldo, ingresos, gastos }: ResumenProps) {
  const fmt = (n: number) => `$${n.toFixed(2)}`;
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-card bg-primary-soft p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:col-span-3 md:col-span-1">
        <p className="text-sm font-semibold text-primary">Saldo disponible</p>
        <p className="mt-2 font-display text-3xl font-bold text-foreground">{fmt(saldo)}</p>
      </div>
      <div className="rounded-card border border-outline/40 bg-income-soft p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <p className="text-sm font-semibold text-income">Ingresos</p>
        <p className="mt-2 font-display text-2xl font-bold text-income">+{fmt(ingresos)}</p>
      </div>
      <div className="rounded-card border border-outline/40 bg-expense-soft p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <p className="text-sm font-semibold text-expense">Gastos</p>
        <p className="mt-2 font-display text-2xl font-bold text-expense">-{fmt(gastos)}</p>
      </div>
    </section>
  );
}

export default Resumen;
