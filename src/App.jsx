import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProfileForm from './pages/ProfileForm';
import ProfilePreview from './pages/ProfilePreview';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
          <Route path="/profile/preview" element={<ProtectedRoute><ProfilePreview /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}
