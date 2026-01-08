"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import { useAuth } from "../../context/AuthContext"
import DataTable from "../common/DataTable"
import "../../styles/Management.css"

export default function GeneralLedger() {
  const { data } = useData()
  const { user } = useAuth()
  const [filterType, setFilterType] = useState("all")

  const sectorTransactions = data.transactions.filter((t) => user.sectors.includes(t.sector))

  const filteredTransactions =
    filterType === "all" ? sectorTransactions : sectorTransactions.filter((t) => t.type === filterType)

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const columns = [
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount", format: (val) => `$${val}` },
    { key: "sector", label: "Sector" },
  ]

  return (
    <div className="management-view">
      <div className="management-header">
        <h1>General Ledger</h1>
      </div>

      <div className="ledger-summary">
        <div className="summary-card">
          <span className="summary-label">Total Income</span>
          <span className="summary-value income">${totalIncome.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Expenses</span>
          <span className="summary-value expense">${totalExpenses.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Net Balance</span>
          <span className="summary-value">${(totalIncome - totalExpenses).toLocaleString()}</span>
        </div>
      </div>

      <div className="management-toolbar">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
          <option value="all">All Transactions</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>

      <DataTable columns={columns} data={filteredTransactions} />
    </div>
  )
}
