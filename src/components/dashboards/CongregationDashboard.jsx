import { useData } from "../../context/DataContext"
import StatCard from "../common/StatCard"
import ActivityList from "../common/ActivityList"
import "../../styles/DashboardStyles.css"

export default function CongregationDashboard() {
  const { data } = useData()

  const totalMembers = data.members.length
  const totalIncome = data.payments.reduce((sum, p) => sum + p.amount, 0)
  const totalExpenses = data.transactions
    .filter((t) => t.type === "expense" && t.sector === "congregation")
    .reduce((sum, t) => sum + t.amount, 0)

  const recentActivities = [
    ...data.payments.map((p) => ({
      id: p.id,
      type: "payment",
      title: "Payment Recorded",
      description: `$${p.amount} - ${p.description}`,
      date: new Date(p.date),
    })),
    ...data.announcements
      .filter((a) => a.sector === "congregation")
      .map((a) => ({
        id: a.id,
        type: "announcement",
        title: a.title,
        description: a.content,
        date: new Date(a.date),
      })),
  ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  return (
    <div className="dashboard-view">
      <div className="dashboard-header">
        <h1>Congregation Dashboard</h1>
        <p>Overview of congregation finances and activities</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Members" value={totalMembers} icon="👥" color="#2563eb" />
        <StatCard label="Total Income" value={`$${totalIncome.toLocaleString()}`} icon="💰" color="#10b981" />
        <StatCard label="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} icon="📤" color="#ef4444" />
        <StatCard
          label="Balance"
          value={`$${(totalIncome - totalExpenses).toLocaleString()}`}
          icon="📊"
          color="#f59e0b"
        />
      </div>

      <div className="dashboard-grid">
        <div className="activity-section">
          <h2>Recent Activities</h2>
          <ActivityList activities={recentActivities} />
        </div>
      </div>
    </div>
  )
}
