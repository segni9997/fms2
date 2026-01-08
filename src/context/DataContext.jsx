"use client"

import { createContext, useContext, useState } from "react"

const DataContext = createContext()

const INITIAL_DATA = {
  members: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "555-0101",
      sector: "congregation",
      joinDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-0102",
      sector: "congregation",
      joinDate: "2023-02-20",
      status: "active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-0103",
      sector: "congregation",
      joinDate: "2023-03-10",
      status: "active",
    },
  ],
  payments: [
    { id: 1, memberId: 1, amount: 100, type: "tithe", date: "2024-01-10", description: "Monthly tithe" },
    { id: 2, memberId: 2, amount: 50, type: "offering", date: "2024-01-15", description: "Building fund offering" },
    { id: 3, memberId: 1, amount: 75, type: "donation", date: "2024-01-20", description: "Missionary fund" },
  ],
  employees: [
    {
      id: 1,
      name: "Michael Brown",
      email: "michael@organization.com",
      phone: "555-0201",
      position: "Pastor",
      sector: "congregation",
      startDate: "2020-01-01",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Davis",
      email: "sarah@organization.com",
      phone: "555-0202",
      position: "Coordinator",
      sector: "development",
      startDate: "2021-06-15",
      status: "active",
    },
  ],
  students: [
    {
      id: 1,
      name: "Alice Wilson",
      email: "alice@school.com",
      phone: "555-0301",
      class: "Grade 10",
      sector: "school",
      enrollDate: "2023-09-01",
      status: "active",
    },
    {
      id: 2,
      name: "Charlie Lee",
      email: "charlie@school.com",
      phone: "555-0302",
      class: "Grade 9",
      sector: "school",
      enrollDate: "2023-09-01",
      status: "active",
    },
  ],
  schoolFees: [
    { id: 1, studentId: 1, amount: 5000, date: "2024-01-15", month: "January", status: "paid" },
    { id: 2, studentId: 2, amount: 5000, date: "2024-01-20", month: "January", status: "paid" },
  ],
  transactions: [
    {
      id: 1,
      type: "income",
      category: "tithe",
      amount: 1000,
      date: "2024-01-10",
      description: "Tithes collected",
      sector: "congregation",
    },
    {
      id: 2,
      type: "expense",
      category: "utilities",
      amount: 200,
      date: "2024-01-12",
      description: "Electricity bill",
      sector: "congregation",
    },
    {
      id: 3,
      type: "income",
      category: "fees",
      amount: 15000,
      date: "2024-01-15",
      description: "School fees collected",
      sector: "school",
    },
  ],
  assets: [
    {
      id: 1,
      name: "Church Building",
      category: "Building",
      value: 500000,
      purchaseDate: "2015-01-01",
      sector: "congregation",
      status: "active",
    },
    {
      id: 2,
      name: "School Computers",
      category: "Equipment",
      value: 50000,
      purchaseDate: "2022-06-01",
      sector: "school",
      status: "active",
    },
  ],
  announcements: [
    { id: 1, title: "Weekly Service", content: "Sunday service at 10 AM", date: "2024-01-20", sector: "congregation" },
    { id: 2, title: "School Holiday", content: "School closed on January 25", date: "2024-01-18", sector: "school" },
  ],
}

export function DataProvider({ children }) {
  const [data, setData] = useState(INITIAL_DATA)
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = "success") => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  const addMember = (member) => {
    const newMember = { ...member, id: Math.max(...data.members.map((m) => m.id), 0) + 1 }
    setData((prev) => ({ ...prev, members: [...prev.members, newMember] }))
    addNotification("Member added successfully")
    return newMember
  }

  const updateMember = (id, updates) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }))
    addNotification("Member updated successfully")
  }

  const addPayment = (payment) => {
    const newPayment = { ...payment, id: Math.max(...data.payments.map((p) => p.id), 0) + 1 }
    setData((prev) => ({ ...prev, payments: [...prev.payments, newPayment] }))
    addNotification("Payment recorded successfully")
    return newPayment
  }

  const addStudent = (student) => {
    const newStudent = { ...student, id: Math.max(...data.students.map((s) => s.id), 0) + 1 }
    setData((prev) => ({ ...prev, students: [...prev.students, newStudent] }))
    addNotification("Student added successfully")
    return newStudent
  }

  const addSchoolFee = (fee) => {
    const newFee = { ...fee, id: Math.max(...data.schoolFees.map((f) => f.id), 0) + 1 }
    setData((prev) => ({ ...prev, schoolFees: [...prev.schoolFees, newFee] }))
    addNotification("School fee recorded successfully")
    return newFee
  }

  return (
    <DataContext.Provider
      value={{
        data,
        notifications,
        addMember,
        updateMember,
        addPayment,
        addStudent,
        addSchoolFee,
        addNotification,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within DataProvider")
  }
  return context
}
