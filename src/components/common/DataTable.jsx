"use client"

import "../../styles/DataTable.css"

export default function DataTable({ columns, data, actions }) {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-row">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{col.format ? col.format(row[col.key]) : row[col.key]}</td>
                ))}
                {actions && (
                  <td className="actions-cell">
                    {actions.map((action) => (
                      <button key={action.label} className="action-btn" onClick={() => action.onClick(row)}>
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
