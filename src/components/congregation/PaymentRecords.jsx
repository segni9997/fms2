"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import DataTable from "../common/DataTable"
import FormModal from "../common/FormModal"
import "../../styles/Management.css"

export default function PaymentRecords() {
  const { data, addPayment } = useData()
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState("all")

  const filteredPayments = filterType === "all" ? data.payments : data.payments.filter((p) => p.type === filterType)

  const handleAddPayment = (formData) => {
    addPayment(formData)
    setShowModal(false)
  }

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0)

  const columns = [
    { key: "memberId", label: "Member ID" },
    { key: "amount", label: "Amount", format: (val) => `$${val}` },
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
  ]

  return (
    <div className="management-view">
      <div className="management-header">
        <h1>Payment Records</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Record Payment
        </button>
      </div>

      <div className="management-toolbar">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
          <option value="all">All Payments</option>
          <option value="tithe">Tithe</option>
          <option value="offering">Offering</option>
          <option value="donation">Donation</option>
        </select>
        <div className="filter-summary">
          Total: <strong>${totalAmount.toLocaleString()}</strong>
        </div>
      </div>

      <DataTable columns={columns} data={filteredPayments} />

      {showModal && (
        <FormModal
          title="Record New Payment"
          onClose={() => setShowModal(false)}
          onSubmit={handleAddPayment}
          fields={[
            { name: "memberId", label: "Member ID", type: "number", required: true },
            { name: "amount", label: "Amount", type: "number", required: true },
            {
              name: "type",
              label: "Payment Type",
              type: "select",
              options: ["tithe", "offering", "donation"],
              required: true,
            },
            { name: "description", label: "Description", type: "text", required: true },
            { name: "date", label: "Date", type: "date", required: true },
          ]}
        />
      )}
    </div>
  )
}
