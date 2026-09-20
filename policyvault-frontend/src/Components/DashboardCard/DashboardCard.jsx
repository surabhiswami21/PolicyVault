import "./DashboardCard.css";

function DashboardCard({ title, value, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-top">
        <div className="card-icon">{icon}</div>
      </div>

      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

export default DashboardCard;