"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@organization.com",
    role: "Super Administrator",
    sectors: ["congregation", "development", "school"],
    name: "Administrator",
  },
  {
    id: 2,
    username: "finance",
    password: "finance123",
    email: "finance@organization.com",
    role: "Finance Officer",
    sectors: ["congregation", "development", "school"],
    name: "Finance Officer",
  },
  {
    id: 3,
    username: "hr",
    password: "hr123",
    email: "hr@organization.com",
    role: "HR Officer",
    sectors: ["congregation", "development"],
    name: "HR Officer",
  },
  {
    id: 4,
    username: "school",
    password: "school123",
    email: "school@organization.com",
    role: "School Administrator",
    sectors: ["school"],
    name: "School Administrator",
  },
  {
    id: 5,
    username: "data",
    password: "data123",
    email: "data@organization.com",
    role: "Data Entry Staff",
    sectors: ["congregation"],
    name: "Data Entry Staff",
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  const login = (username, password) => {
    setError("")
    const foundUser = MOCK_USERS.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    } else {
      setError("Invalid username or password")
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const hasAccessToModule = (moduleSector) => {
    if (!user) return false
    if (user.role === "Super Administrator") return true
    return user.sectors.includes(moduleSector)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        login,
        logout,
        hasAccessToModule,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
