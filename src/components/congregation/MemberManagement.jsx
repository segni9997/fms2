"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import DataTable from "../common/DataTable"
import FormModal from "../common/FormModal"
import "../../styles/Management.css"

export default function MemberManagement() {
  const { data, addMember, updateMember } = useData()
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingMember, setEditingMember] = useState(null)

  const filteredMembers = data.members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMember = (formData) => {
    if (editingMember) {
      updateMember(editingMember.id, formData)
      setEditingMember(null)
    } else {
      addMember(formData)
    }
    setShowModal(false)
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setShowModal(true)
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "joinDate", label: "Join Date" },
    { key: "status", label: "Status" },
  ]

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "View",
      onClick: (member) => console.log(member),
    },
  ]

  return (
    <div className="management-view">
      <div className="management-header">
        <h1>Member Management</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingMember(null)
            setShowModal(true)
          }}
        >
          + Add Member
        </button>
      </div>

      <div className="management-toolbar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <DataTable columns={columns} data={filteredMembers} actions={actions} />

      {showModal && (
        <FormModal
          title={editingMember ? "Edit Member" : "Add New Member"}
          onClose={() => {
            setShowModal(false)
            setEditingMember(null)
          }}
          onSubmit={handleAddMember}
          fields={[
            { name: "name", label: "Full Name", type: "text", required: true, value: editingMember?.name || "" },
            { name: "email", label: "Email", type: "email", required: true, value: editingMember?.email || "" },
            { name: "phone", label: "Phone", type: "tel", required: true, value: editingMember?.phone || "" },
            {
              name: "sector",
              label: "Sector",
              type: "select",
              options: ["congregation", "development", "school"],
              required: true,
              value: editingMember?.sector || "congregation",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: ["active", "inactive"],
              required: true,
              value: editingMember?.status || "active",
            },
          ]}
        />
      )}
    </div>
  )
}
