export default function IncomeStatement({ data, sectors }) {
  const income = data.transactions
    .filter((t) => t.type === "income" && sectors.includes(t.sector))
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = data.transactions
    .filter((t) => t.type === "expense" && sectors.includes(t.sector))
    .reduce((sum, t) => sum + t.amount, 0)
  const netIncome = income - expenses

  return (
    <div className="report-table">
      <h2>Income Statement</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="section-header">
            <td>
              <strong>REVENUE</strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="indent">Total Income</td>
            <td>${income.toLocaleString()}</td>
          </tr>
          <tr className="section-header">
            <td>
              <strong>EXPENSES</strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="indent">Total Expenses</td>
            <td>-${expenses.toLocaleString()}</td>
          </tr>
          <tr className="total-row">
            <td>
              <strong>NET INCOME</strong>
            </td>
            <td>
              <strong>${netIncome.toLocaleString()}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
