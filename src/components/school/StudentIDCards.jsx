"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import "../../styles/PrintableCards.css"

export default function StudentIDCards() {
  const { data } = useData()
  const [selectedStudents, setSelectedStudents] = useState([])

  const handleSelectAll = () => {
    if (selectedStudents.length === data.students.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(data.students.map((s) => s.id))
    }
  }

  const handleSelectStudent = (id) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }

  const handlePrint = () => {
    window.print()
  }

  const getStudentById = (id) => data.students.find((s) => s.id === id)

  return (
    <div className="id-cards-view">
      <div className="id-cards-header">
        <h1>Student ID Cards</h1>
        <div className="id-cards-actions">
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={selectedStudents.length === data.students.length && data.students.length > 0}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>
          <button className="btn-primary" onClick={handlePrint} disabled={selectedStudents.length === 0}>
            🖨️ Print Selected Cards
          </button>
        </div>
      </div>

      <div className="students-list">
        {data.students.map((student) => (
          <label key={student.id} className="student-checkbox">
            <input
              type="checkbox"
              checked={selectedStudents.includes(student.id)}
              onChange={() => handleSelectStudent(student.id)}
            />
            <span>
              {student.name} - {student.class}
            </span>
          </label>
        ))}
      </div>

      {selectedStudents.length > 0 && (
        <div className="print-preview">
          <h2>Print Preview</h2>
          <div className="cards-container">
            {selectedStudents.map((id) => {
              const student = getStudentById(id)
              return (
                <div key={id} className="id-card">
                  <div className="card-header">STUDENT ID CARD</div>
                  <div className="card-photo">📷</div>
                  <div className="card-content">
                    <div className="card-field">
                      <span className="label">NAME:</span>
                      <span className="value">{student.name}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">ID:</span>
                      <span className="value">{student.id}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">CLASS:</span>
                      <span className="value">{student.class}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">EMAIL:</span>
                      <span className="value">{student.email}</span>
                    </div>
                    <div className="card-field">
                      <span className="label">PHONE:</span>
                      <span className="value">{student.phone}</span>
                    </div>
                  </div>
                  <div className="card-footer">Issue Date: {new Date().toLocaleDateString()}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
