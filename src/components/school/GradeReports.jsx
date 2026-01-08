"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import "../../styles/PrintableCards.css"

export default function GradeReports() {
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

  // Mock grades data
  const getStudentGrades = (studentId) => ({
    mathematics: Math.floor(Math.random() * 40) + 60,
    english: Math.floor(Math.random() * 40) + 60,
    science: Math.floor(Math.random() * 40) + 60,
    history: Math.floor(Math.random() * 40) + 60,
    arts: Math.floor(Math.random() * 40) + 60,
  })

  const getGradeLetters = (score) => {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 70) return "C"
    if (score >= 60) return "D"
    return "F"
  }

  return (
    <div className="reports-view">
      <div className="reports-header">
        <h1>Grade Reports</h1>
        <div className="reports-actions">
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={selectedStudents.length === data.students.length && data.students.length > 0}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>
          <button className="btn-primary" onClick={handlePrint} disabled={selectedStudents.length === 0}>
            🖨️ Print Reports
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
          <div className="reports-container">
            {selectedStudents.map((id) => {
              const student = getStudentById(id)
              const grades = getStudentGrades(id)
              const average = Math.round(Object.values(grades).reduce((a, b) => a + b) / 5)

              return (
                <div key={id} className="grade-report">
                  <div className="report-header">
                    <h3>GRADE REPORT</h3>
                    <div className="school-name">ABC School</div>
                  </div>

                  <div className="student-info">
                    <div className="info-row">
                      <span className="label">Student Name:</span>
                      <span className="value">{student.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Class:</span>
                      <span className="value">{student.class}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Academic Year:</span>
                      <span className="value">2024/2025</span>
                    </div>
                  </div>

                  <table className="grades-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(grades).map(([subject, score]) => (
                        <tr key={subject}>
                          <td>{subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                          <td>{score}</td>
                          <td className="grade-cell">{getGradeLetters(score)}</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td>Average</td>
                        <td className="bold">{average}</td>
                        <td className="bold">{getGradeLetters(average)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="report-footer">
                    <p>Date Generated: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="page-break"></div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
