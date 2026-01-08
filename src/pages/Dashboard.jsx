"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import Notifications from "../components/Notifications"
import CongregationDashboard from "../components/dashboards/CongregationDashboard"
import DevelopmentDashboard from "../components/dashboards/DevelopmentDashboard"
import SchoolDashboard from "../components/dashboards/SchoolDashboard"
import MemberManagement from "../components/congregation/MemberManagement"
import PaymentRecords from "../components/congregation/PaymentRecords"
import EmployeeManagement from "../components/shared/EmployeeManagement"
import GeneralLedger from "../components/shared/GeneralLedger"
import FinancialReports from "../components/shared/FinancialReports"
import StudentManagement from "../components/school/StudentManagement"
import SchoolFeeManagement from "../components/school/SchoolFeeManagement"
import Announcements from "../components/congregation/Announcements"
import MemberIDCards from "../components/congregation/MemberIDCards"
import StudentIDCards from "../components/school/StudentIDCards"
import GradeReports from "../components/school/GradeReports"
import StudentCertificates from "../components/school/StudentCertificates"
import "../styles/Dashboard.css"

const PAGES = {
  DASHBOARD: "dashboard",
  MEMBERS: "members",
  MEMBERIDS: "memberids",
  PAYMENTS: "payments",
  EMPLOYEES: "employees",
  LEDGER: "ledger",
  REPORTS: "reports",
  STUDENTS: "students",
  STUDENTIDS: "studentids",
  GRADES: "grades",
  CERTIFICATES: "certificates",
  FEES: "fees",
  ANNOUNCEMENTS: "announcements",
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { data, notifications } = useData()
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    setCurrentPage(PAGES.DASHBOARD)
    setSidebarOpen(true)
    logout()
  }

  const renderContent = () => {
    switch (currentPage) {
      case PAGES.DASHBOARD:
        if (user.sectors.includes("congregation")) {
          return <CongregationDashboard />
        } else if (user.sectors.includes("development")) {
          return <DevelopmentDashboard />
        } else if (user.sectors.includes("school")) {
          return <SchoolDashboard />
        }
        break
      case PAGES.MEMBERS:
        return <MemberManagement />
      case PAGES.MEMBERIDS:
        return <MemberIDCards />
      case PAGES.PAYMENTS:
        return <PaymentRecords />
      case PAGES.EMPLOYEES:
        return <EmployeeManagement />
      case PAGES.LEDGER:
        return <GeneralLedger />
      case PAGES.REPORTS:
        return <FinancialReports />
      case PAGES.STUDENTS:
        return <StudentManagement />
      case PAGES.STUDENTIDS:
        return <StudentIDCards />
      case PAGES.GRADES:
        return <GradeReports />
      case PAGES.CERTIFICATES:
        return <StudentCertificates />
      case PAGES.FEES:
        return <SchoolFeeManagement />
      case PAGES.ANNOUNCEMENTS:
        return <Announcements />
      default:
        return <CongregationDashboard />
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="dashboard-main">
        <TopBar onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} user={user} />
        <main className="dashboard-content">{renderContent()}</main>
      </div>
      <Notifications notifications={notifications} />
    </div>
  )
}
