"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import "../../styles/PrintableCards.css"

export default function StudentCertificates() {
  const { data } = useData()
  const [selectedStudents, setSelectedStudents] = useState([])
  const [certificateType, setCertificateType] = useState("completion")

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
    <div className="certificates-view">
      <div className="certificates-header">
        <h1>Student Certificates</h1>
        <div className="cert-controls">
          <select value={certificateType} onChange={(e) => setCertificateType(e.target.value)} className="select-input">
            <option value="completion">Completion Certificate</option>
            <option value="achievement">Achievement Certificate</option>
            <option value="attendance">Attendance Certificate</option>
          </select>
        </div>
        <div className="cert-actions">
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={selectedStudents.length === data.students.length && data.students.length > 0}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>
          <button className="btn-primary" onClick={handlePrint} disabled={selectedStudents.length === 0}>
            🖨️ Print Certificates
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
          <div className="certificates-container">
            {selectedStudents.map((id) => {
              const student = getStudentById(id)
              return (
                <div key={id} className="certificate">
                  <div className="cert-border"></div>
                  <div className="cert-content">
                    <div className="cert-title">
                      {certificateType === "completion" && "Certificate of Completion"}
                      {certificateType === "achievement" && "Certificate of Achievement"}
                      {certificateType === "attendance" && "Certificate of Attendance"}
                    </div>

                    <div className="cert-text">
                      <p>This is to certify that</p>
                      <div className="student-name-cert">{student.name}</div>
                      <p>has successfully completed the academic year</p>
                      <p>in {student.class}</p>
                    </div>

                    <div className="cert-details">
                      <p>with commendable performance and dedication</p>
                      <p>Awarded on {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="signature-line">
                      <div className="sig-block">
                        <div className="sig-line">_________________</div>
                        <div className="sig-name">Principal</div>
                      </div>
                      <div className="sig-block">
                        <div className="sig-line">_________________</div>
                        <div className="sig-name">Class Teacher</div>
                      </div>
                    </div>
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
