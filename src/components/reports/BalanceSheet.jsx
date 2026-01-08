export default function BalanceSheet({ data, sectors }) {
  const assets = data.assets.filter((a) => sectors.includes(a.sector)).reduce((sum, a) => sum + a.value, 0)
  const income = data.transactions
    .filter((t) => t.type === "income" && sectors.includes(t.sector))
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = data.transactions
    .filter((t) => t.type === "expense" && sectors.includes(t.sector))
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="report-table">
      <h2>Balance Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="section-header">
            <td>
              <strong>ASSETS</strong>
            </td>
            <td>
              <strong>${assets.toLocaleString()}</strong>
            </td>
          </tr>
          <tr className="section-header">
            <td>
              <strong>LIABILITIES & EQUITY</strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="indent">Income</td>
            <td>${income.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="indent">Expenses</td>
            <td>-${expenses.toLocaleString()}</td>
          </tr>
          <tr className="total-row">
            <td>
              <strong>Net Worth</strong>
            </td>
            <td>
              <strong>${(assets + income - expenses).toLocaleString()}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
