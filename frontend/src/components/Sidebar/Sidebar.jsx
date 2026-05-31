import AppIcon from "../AppIcon/AppIcon";

const navItems = [
  {
    icon: "board",
    label: "Board",
  },
  {
    icon: "tasks",
    label: "My tasks",
  },
  {
    icon: "analytics",
    label: "Analytics",
  },
  {
    icon: "settings",
    label: "Settings",
  },
];

const getInitials = (name = "User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

function Sidebar({ user, onLogout }) {
  const displayName = user?.name || "Nitheesh";

  return (
    <aside className="app-sidebar">
      <div>
        <div className="brand-row sidebar-brand">
          <span className="brand-mark">T</span>
          <span className="brand-name">TaskFlow</span>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard sections">
          {navItems.map((item) => (
            <button
              className={`sidebar-link ${
                item.label === "Board" ? "sidebar-link--active" : ""
              }`}
              type="button"
              key={item.label}
            >
              <AppIcon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="user-chip">
          <span className="user-avatar">
            {getInitials(displayName)}
          </span>
          <div>
            <strong>{displayName}</strong>
            <span>Workspace owner</span>
          </div>
        </div>

        <button
          className="icon-button icon-button--ghost"
          type="button"
          onClick={onLogout}
          aria-label="Log out"
          title="Log out"
        >
          <AppIcon name="logout" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
