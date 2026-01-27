import { Outlet } from 'react-router-dom';

/**
 * PublicLayout - Simple wrapper for public pages (login, register).
 *
 * Child routes render inside <Outlet />.
 */
export const PublicLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Outlet />
  </div>
);