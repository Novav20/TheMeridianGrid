import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/layouts/ProtectedLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AssetInventoryPage } from '@/pages/AssetInventoryPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/**
 * AppRoutes - Central route definitions for the application.
 *
 * Structure:
 * - PublicLayout routes: /login, /register (no auth required)
 * - ProtectedLayout routes: /dashboard, /assets (auth required)
 * - Catch-all: /* (404)
 */
export const AppRoutes = () => (
  <Routes>
    {/* Public Layout Routes */}
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>

    {/* Protected Layout Routes */}
    <Route element={<ProtectedLayout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/assets" element={<AssetInventoryPage />} />
      <Route index element={<Navigate to="/dashboard" replace />} />
    </Route>

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
