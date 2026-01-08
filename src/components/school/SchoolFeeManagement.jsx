"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import DataTable from "../common/DataTable"
import FormModal from "../common/FormModal"
import "../../styles/Management.css"

export default function SchoolFeeManagement() {
  const { data, addSchoolFee } = useData()
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredFees =
    filterStatus === "all" ? data.schoolFees : data.schoolFees.filter((f) => f.status === filterStatus)

  const handleAddFee = (formData) => {
    addSchoolFee(formData)
    setShowModal(false)
  }

  const totalCollected = data.schoolFees.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0)
  const totalUnpaid = data.schoolFees.filter((f) => f.status === "unpaid").reduce((sum, f) => sum + f.amount, 0)

  const columns = [
    { key: "studentId", label: "Student ID" },
    { key: "amount", label: "Amount", format: (val) => `$${val}` },
    { key: "month", label: "Month" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ]

  return (
    <div className="management-view">
      <div className="management-header">
        <h1>School Fee Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Record Fee
        </button>
      </div>

      <div className="ledger-summary">
        <div className="summary-card">
          <span className="summary-label">Collected</span>
          <span className="summary-value income">${totalCollected.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Unpaid</span>
          <span className="summary-value expense">${totalUnpaid.toLocaleString()}</span>
        </div>
      </div>

      <div className="management-toolbar">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">All Fees</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <DataTable columns={columns} data={filteredFees} />

      {showModal && (
        <FormModal
          title="Record School Fee"
          onClose={() => setShowModal(false)}
          onSubmit={handleAddFee}
          fields={[
            { name: "studentId", label: "Student ID", type: "number", required: true },
            { name: "amount", label: "Amount", type: "number", required: true },
            { name: "month", label: "Month", type: "text", required: true },
            { name: "status", label: "Status", type: "select", options: ["paid", "unpaid"], required: true },
            { name: "date", label: "Date", type: "date", required: true },
          ]}
        />
      )}
    </div>
  )
}
