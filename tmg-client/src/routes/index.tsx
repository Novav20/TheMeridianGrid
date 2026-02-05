import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/layouts/ProtectedLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { LoadingFallback } from '@/components/LoadingFallback';

// Lazy load pages for performance (Code Splitting)
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AssetInventoryPage = lazy(() => import('@/pages/AssetInventoryPage').then(m => ({ default: m.AssetInventoryPage })));
const OperatorViewPage = lazy(() => import('@/pages/OperatorViewPage').then(m => ({ default: m.OperatorViewPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

/**
 * AppRoutes - Central route definitions for the application.
 * Uses Suspense for lazy-loaded components.
 */
export const AppRoutes = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Layout Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assets" element={<AssetInventoryPage />} />
        <Route path="/operator" element={<OperatorViewPage />} />
        <Route index element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);