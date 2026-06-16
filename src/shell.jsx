import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "RUTINA", color: "#22c55e" },
  { to: "/nutricion", label: "NUTRICIÓN", color: "#f59e0b" },
];

export default function Shell() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <nav style={{
        display: "flex",
        background: "#111",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            style={({ isActive }) => ({
              flex: 1,
              textAlign: "center",
              padding: "12px 4px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "12px",
              fontWeight: isActive ? 800 : 500,
              color: isActive ? link.color : "#444",
              borderBottom: `3px solid ${isActive ? link.color : "transparent"}`,
              textDecoration: "none",
              letterSpacing: "0.08em",
              transition: "all 0.2s ease",
              background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
