import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';

/**
 * ProtectedLayout - Renders Sidebar + Navbar + child routes.
 *
 * All routes wrapped in this layout require authentication.
 * Child routes render inside <Outlet />.
 */
export const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};