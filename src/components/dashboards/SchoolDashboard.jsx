import { useData } from "../../context/DataContext"
import StatCard from "../common/StatCard"
import "../../styles/DashboardStyles.css"

export default function SchoolDashboard() {
  const { data } = useData()

  const totalStudents = data.students.length
  const totalFeesPaid = data.schoolFees.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0)
  const schoolTransactions = data.transactions.filter((t) => t.sector === "school")
  const schoolExpenses = schoolTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="dashboard-view">
      <div className="dashboard-header">
        <h1>School Dashboard</h1>
        <p>Overview of school operations and finances</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Students" value={totalStudents} icon="🎓" color="#2563eb" />
        <StatCard label="Fees Collected" value={`$${totalFeesPaid.toLocaleString()}`} icon="💰" color="#10b981" />
        <StatCard
          label="Operational Expenses"
          value={`$${schoolExpenses.toLocaleString()}`}
          icon="📤"
          color="#ef4444"
        />
        <StatCard
          label="Balance"
          value={`$${(totalFeesPaid - schoolExpenses).toLocaleString()}`}
          icon="📊"
          color="#f59e0b"
        />
      </div>
    </div>
  )
}
