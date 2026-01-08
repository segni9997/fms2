"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import { useAuth } from "../../context/AuthContext"
import BalanceSheet from "../reports/BalanceSheet"
import IncomeStatement from "../reports/IncomeStatement"
import "../../styles/Reports.css"

export default function FinancialReports() {
  const [reportType, setReportType] = useState("balanceSheet")
  const { data } = useData()
  const { user } = useAuth()

  const renderReport = () => {
    switch (reportType) {
      case "balanceSheet":
        return <BalanceSheet data={data} sectors={user.sectors} />
      case "incomeStatement":
        return <IncomeStatement data={data} sectors={user.sectors} />
      case "trialBalance":
        return <TrialBalance data={data} sectors={user.sectors} />
      default:
        return null
    }
  }

  return (
    <div className="reports-view">
      <div className="reports-header">
        <h1>Financial Reports</h1>
        <button className="btn-primary" onClick={() => window.print()}>
          🖨️ Print Report
        </button>
      </div>

      <div className="report-selector">
        {["balanceSheet", "incomeStatement", "trialBalance"].map((type) => (
          <button
            key={type}
            className={`report-tab ${reportType === type ? "active" : ""}`}
            onClick={() => setReportType(type)}
          >
            {type === "balanceSheet" && "Balance Sheet"}
            {type === "incomeStatement" && "Income Statement"}
            {type === "trialBalance" && "Trial Balance"}
          </button>
        ))}
      </div>

      <div className="report-content">{renderReport()}</div>
    </div>
  )
}

function TrialBalance({ data, sectors }) {
  return (
    <div className="report-table">
      <h2>Trial Balance</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Assets</td>
            <td>${data.assets.reduce((sum, a) => sum + a.value, 0).toLocaleString()}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Income</td>
            <td>-</td>
            <td>
              $
              {data.transactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>
              $
              {data.transactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
