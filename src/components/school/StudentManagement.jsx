"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import DataTable from "../common/DataTable"
import FormModal from "../common/FormModal"
import "../../styles/Management.css"

export default function StudentManagement() {
  const { data, addStudent } = useData()
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = data.students.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddStudent = (formData) => {
    addStudent(formData)
    setShowModal(false)
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "class", label: "Class" },
    { key: "enrollDate", label: "Enroll Date" },
    { key: "status", label: "Status" },
  ]

  return (
    <div className="management-view">
      <div className="management-header">
        <h1>Student Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Add Student
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

      <DataTable columns={columns} data={filteredStudents} />

      {showModal && (
        <FormModal
          title="Add New Student"
          onClose={() => setShowModal(false)}
          onSubmit={handleAddStudent}
          fields={[
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            {
              name: "class",
              label: "Class",
              type: "select",
              options: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
              required: true,
            },
          ]}
        />
      )}
    </div>
  )
}
