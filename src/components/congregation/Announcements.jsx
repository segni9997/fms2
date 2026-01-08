"use client"

import { useState } from "react"
import { useData } from "../../context/DataContext"
import "../../styles/Announcements.css"

export default function Announcements() {
  const { data } = useData()
  const [filter, setFilter] = useState("all")

  const congregationAnnouncements = data.announcements.filter((a) => a.sector === "congregation")

  return (
    <div className="announcements-view">
      <div className="announcements-header">
        <h1>Announcements</h1>
        <button className="btn-primary">+ New Announcement</button>
      </div>

      <div className="announcements-list">
        {congregationAnnouncements.map((announcement) => (
          <div key={announcement.id} className="announcement-card">
            <div className="announcement-date">{new Date(announcement.date).toLocaleDateString()}</div>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
