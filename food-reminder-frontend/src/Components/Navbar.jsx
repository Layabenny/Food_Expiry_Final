import "../Styles/Navbar.css";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Expry</div>
      <ul className="navbar-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#notifications">Notifications</a></li>
        <li>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
