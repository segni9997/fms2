"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import DataTable from "../common/DataTable"
import FormModal from "../common/FormModal"
import "../../styles/Management.css"

export default function EmployeeManagement() {
  const { data } = useData()
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = data.employees.filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const columns = [
    { key: "name", label: "Name" },
    { key: "position", label: "Position" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "sector", label: "Sector" },
    { key: "startDate", label: "Start Date" },
    { key: "status", label: "Status" },
  ]

  return (
    <div className="management-view">
      <div className="management-header">
        <h1>Employee Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Add Employee
        </button>
      </div>

      <div className="management-toolbar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <DataTable columns={columns} data={filteredEmployees} />

      {showModal && (
        <FormModal
          title="Add New Employee"
          onClose={() => setShowModal(false)}
          onSubmit={() => setShowModal(false)}
          fields={[
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "position", label: "Position", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            {
              name: "sector",
              label: "Sector",
              type: "select",
              options: ["congregation", "development", "school"],
              required: true,
            },
          ]}
        />
      )}
    </div>
  )
}
