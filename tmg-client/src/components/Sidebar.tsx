/**
 * Sidebar - Navigation sidebar for protected routes.
 *
 * TODO: Add links to main features (Dashboard, Assets, Settings).
 */
export const Sidebar = () => (
  <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem' }}>
    <h2>TMG</h2>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/assets">Assets</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  </aside>
);
