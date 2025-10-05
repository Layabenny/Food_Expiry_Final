import "../Styles/NotificationPanel.css";

export default function NotificationPanel({ notifications }) {
  const alerts = notifications.filter((n) => n.status !== "fresh");

  return (
    <div className="notifications">
      <h3>Notifications 🔔</h3>
      {alerts.length === 0 ? (
        <p> All items are fresh</p>
      ) : (
        alerts.map((note) => (
          <p key={note.id} className={note.status}>
            {note.name} →{" "}
            {note.status === "expired"
              ? "Expired!"
              : `Expiring in ${note.diffDays} days`}
          </p>
        ))
      )}
    </div>
  );
}
