"use client"
import { AuthProvider } from "./context/AuthContext"
import { DataProvider } from "./context/DataContext"
import { useAuth } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <Dashboard />
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  )
}
