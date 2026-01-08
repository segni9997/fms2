"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import "../../styles/PrintableCards.css"

export default function MemberIDCards() {
  const { data } = useData()
  const [selectedMembers, setSelectedMembers] = useState([])

  const handleSelectAll = () => {
    if (selectedMembers.length === data.members.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(data.members.map((m) => m.id))
    }
  }

  const handleSelectMember = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]))
  }

  const handlePrint = () => {
    window.print()
  }

  const getMemberById = (id) => data.members.find((m) => m.id === id)

  return (
    <div className="id-cards-view">
      <div className="id-cards-header">
        <h1>Member ID Cards</h1>
        <div className="id-cards-actions">
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={selectedMembers.length === data.members.length && data.members.length > 0}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>
          <button className="btn-primary" onClick={handlePrint} disabled={selectedMembers.length === 0}>
            🖨️ Print Member IDs
          </button>
        </div>
      </div>

      <div className="members-list">
        {data.members.map((member) => (
          <label key={member.id} className="member-checkbox">
            <input
              type="checkbox"
              checked={selectedMembers.includes(member.id)}
              onChange={() => handleSelectMember(member.id)}
            />
            <span>
              {member.name} ({member.membershipType})
            </span>
          </label>
        ))}
      </div>

      {selectedMembers.length > 0 && (
        <div className="print-preview">
          <h2>Print Preview</h2>
          <div className="cards-container">
            {selectedMembers.map((id) => {
              const member = getMemberById(id)
              return (
                <div key={id} className="id-card member-card">
                  <div className="card-header">MEMBER ID</div>
                  <div className="card-photo">👤</div>
                  <div className="card-content">
                    <div className="card-field">
                      <span className="label">NAME:</span>
                      <span className="value">{member.name}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">ID:</span>
                      <span className="value">MEM-{String(member.id).padStart(4, "0")}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">TYPE:</span>
                      <span className="value">{member.membershipType}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">EMAIL:</span>
                      <span className="value">{member.email}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">PHONE:</span>
                      <span className="value">{member.phone}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    Valid Until: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
