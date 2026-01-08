export default function ActivityList({ activities }) {
  return (
    <div className="activity-list">
      {activities.length === 0 ? (
        <div className="empty-state">No activities yet</div>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-type-badge" data-type={activity.type}>
              {activity.type === "payment" ? "💳" : "📢"}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-description">{activity.description}</div>
            </div>
            <div className="activity-date">{activity.date.toLocaleDateString()}</div>
          </div>
        ))
      )}
    </div>
  )
}
