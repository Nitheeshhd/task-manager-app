const iconPaths = {
  analytics: (
    <>
      <path d="M4 18V9" />
      <path d="M10 18V5" />
      <path d="M16 18v-7" />
      <path d="M3 18h14" />
    </>
  ),
  board: (
    <>
      <path d="M4 4h5v6H4z" />
      <path d="M13 4h5v12h-5z" />
      <path d="M4 14h5v4H4z" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  delete: (
    <>
      <path d="M5 7h14" />
      <path d="M9 7V5h6v2" />
      <path d="M8 10v8" />
      <path d="M12 10v8" />
      <path d="M16 10v8" />
      <path d="M7 7l1 13h8l1-13" />
    </>
  ),
  edit: (
    <>
      <path d="M5 16l-.5 3.5L8 19l9.5-9.5-3-3L5 16z" />
      <path d="M13.5 7.5l3 3" />
    </>
  ),
  logout: (
    <>
      <path d="M10 5H5v14h5" />
      <path d="M14 8l4 4-4 4" />
      <path d="M8 12h10" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  settings: (
    <>
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      <path d="M4 12h2" />
      <path d="M18 12h2" />
      <path d="M12 4v2" />
      <path d="M12 18v2" />
      <path d="M6.5 6.5l1.5 1.5" />
      <path d="M16 16l1.5 1.5" />
      <path d="M17.5 6.5L16 8" />
      <path d="M8 16l-1.5 1.5" />
    </>
  ),
  tasks: (
    <>
      <path d="M7 7h12" />
      <path d="M7 12h12" />
      <path d="M7 17h12" />
      <path d="M4 7h.01" />
      <path d="M4 12h.01" />
      <path d="M4 17h.01" />
    </>
  ),
};

function AppIcon({ name, size = 18 }) {
  return (
    <svg
      className="app-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}

export default AppIcon;
