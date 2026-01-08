import { useData } from "../../context/DataContext"
import StatCard from "../common/StatCard"
import "../../styles/DashboardStyles.css"

export default function DevelopmentDashboard() {
  const { data } = useData()

  const devEmployees = data.employees.filter((e) => e.sector === "development").length
  const devTransactions = data.transactions.filter((t) => t.sector === "development")
  const devIncome = devTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const devExpenses = devTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="dashboard-view">
      <div className="dashboard-header">
        <h1>Development Sector Dashboard</h1>
        <p>Overview of development projects and finances</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Employees" value={devEmployees} icon="👥" color="#2563eb" />
        <StatCard label="Total Income" value={`$${devIncome.toLocaleString()}`} icon="💰" color="#10b981" />
        <StatCard label="Total Expenses" value={`$${devExpenses.toLocaleString()}`} icon="📤" color="#ef4444" />
        <StatCard label="Balance" value={`$${(devIncome - devExpenses).toLocaleString()}`} icon="📊" color="#f59e0b" />
      </div>
    </div>
  )
}
