import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import UserList from '../components/UserList';
import UserProfile from '../components/UserProfile';
import UserProfileEdit from '../components/UserProfileEdit';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';
import Home from '../components/Home';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <PrivateRoute><Home /></PrivateRoute>
      } />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <AdminRoute>
              <UserList />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <UserProfile /> 
          </PrivateRoute>
        }
      />
      <Route
      path="/profile/:userId"
      element={
        <PrivateRoute>
          <AdminRoute>
            <UserProfileEdit />
          </AdminRoute>
        </PrivateRoute>
      }
    />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;