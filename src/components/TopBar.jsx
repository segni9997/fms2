"use client"

import "../styles/TopBar.css"

export default function TopBar({ onLogout, onToggleSidebar, user }) {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout()
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger-btn" onClick={onToggleSidebar} title="Toggle sidebar">
          ☰
        </button>
        <h1 className="topbar-title">Financial & Administrative System</h1>
      </div>
      <div className="topbar-right">
        <div className="user-greeting">
          <span>
            Welcome, <strong>{user.name}</strong>
          </span>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout from the system">
          🚪 Logout
        </button>
      </div>
    </header>
  )
}
