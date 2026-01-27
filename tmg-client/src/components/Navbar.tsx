/**
 * Navbar - Top navigation bar for protected routes.
 *
 * TODO: Add user info, logout button, theme toggle.
 */
export const Navbar = () => (
  <header style={{ borderBottom: '1px solid #ccc', padding: '1rem', backgroundColor: '#f5f5f5' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>The Meridian Grid</h1>
      <div>
        <button>Logout</button>
      </div>
    </div>
  </header>
);
