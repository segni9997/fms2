import "../styles/Notifications.css"

export default function Notifications({ notifications }) {
  return (
    <div className="notifications-container">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification notification-${notif.type}`}>
          <span>{notif.message}</span>
        </div>
      ))}
    </div>
  )
}
