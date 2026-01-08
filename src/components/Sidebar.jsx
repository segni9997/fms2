"use client"

import { useAuth } from "../context/AuthContext"
import "../styles/Sidebar.css"

const MENU_ITEMS = {
  congregation: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "members", label: "Member Management", icon: "👥" },
    { id: "memberids", label: "Member ID Cards", icon: "🎫" },
    { id: "payments", label: "Payment Records", icon: "💳" },
    { id: "employees", label: "Employee Management", icon: "👔" },
    { id: "ledger", label: "General Ledger", icon: "📖" },
    { id: "reports", label: "Financial Reports", icon: "📈" },
    { id: "announcements", label: "Announcements", icon: "📢" },
  ],
  development: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "employees", label: "Employee Management", icon: "👔" },
    { id: "ledger", label: "General Ledger", icon: "📖" },
    { id: "reports", label: "Financial Reports", icon: "📈" },
  ],
  school: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "students", label: "Student Management", icon: "🎓" },
    { id: "studentids", label: "Student ID Cards", icon: "🎫" },
    { id: "grades", label: "Grade Reports", icon: "📊" },
    { id: "certificates", label: "Certificates", icon: "🏆" },
    { id: "fees", label: "School Fees", icon: "💰" },
    { id: "employees", label: "Staff Management", icon: "👔" },
    { id: "ledger", label: "General Ledger", icon: "📖" },
    { id: "reports", label: "Financial Reports", icon: "📈" },
  ],
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  const { user } = useAuth()
  const primarySector = user.sectors[0]
  const menuItems = MENU_ITEMS[primarySector] || []

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Organization</h2>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar">{user.name.charAt(0)}</div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? "active" : ""}`}
              onClick={() => {
                onNavigate(item.id)
                onClose()
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
