import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GetMsisdnInfoForm from './pages/dashboards/GetMsisdnInformation/GetMsisdnInfoForm';
import GetMsisdnInformation from './pages/dashboards/GetMsisdnInformation/GetMsisdnInformation';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Sidebar from './components/Sidebar/AppSidebar';
import Navbar from './components/Navbar/Navbar';
import { AuthContextProvider, AuthContext } from "./Context/authContext";
import LookupVoucherSNForm from './pages/dashboards/LookupVoucher/LookupVoucherSNForm';
import LookupVoucherACForm from './pages/dashboards/LookupVoucher/LookupVoucherACForm';
import LookupVoucherInfo from './pages/dashboards/LookupVoucher/LookupVoucherInfo';
import MsisdnHistory from './pages/dashboards/MsisdnHistory/MissdnHistory';
import SCDA from './pages/dashboards/Help/SCDA';
import ServiceIdentifier from './pages/dashboards/Help/ServiceIdentifier';
import Offer from './pages/dashboards/Help/Offer';
import Usage from './pages/dashboards/Help/Usage';
import Trace4G from './pages/dashboards/GetMsisdnInformation/Trace4G';
import UserManagement from './pages/dashboards/UserManagement/UserManagement';
import Profile from './pages/Profile/Profile';
import SystemLogs from './pages/dashboards/SystemLogs/SystemLogs';
import Chatbot from './pages/dashboards/Chatbot/Chatbot';

import { useContext, useState } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, isTokenExpired } = useContext(AuthContext);
  if (!currentUser || !currentUser.email || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin-only Route Component
const AdminRoute = ({ children }) => {
  const { currentUser, isTokenExpired } = useContext(AuthContext);
  if (!currentUser || !currentUser.email || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }
  if (currentUser.class?.toUpperCase() !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Layout Component for dashboard pages
const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar onToggle={setSidebarCollapsed} />
      <div style={{
        marginLeft: sidebarCollapsed ? '80px' : '240px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease'
      }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: sidebarCollapsed ? '80px' : '240px',
          right: 0,
          zIndex: 999,
          transition: 'left 0.3s ease'
        }}>
          <Navbar />
        </div>
        <main style={{
          flex: 1,
          padding: '24px',
          marginTop: '64px',
          backgroundColor: '#f5f6fa',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Root route redirects to dashboard for development */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public routes (no sidebar/navbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected dashboard routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GetMsisdnInfoForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/account" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GetMsisdnInfoForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/msisdn-info" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GetMsisdnInformation />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/msisdn-history" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MsisdnHistory />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/trace-4G" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Trace4G />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Help Routes */}
          <Route 
            path="/help" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div>Help Page - Select a subcategory</div>
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/scda" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SCDA />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/service" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ServiceIdentifier />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/offer" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Offer />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help/usage" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Usage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Voucher System Routes */}
          <Route 
            path="/vs/serial-number" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LookupVoucherSNForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vs/activation-code" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LookupVoucherACForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vs/info" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LookupVoucherInfo />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/user-management"
            element={
              <AdminRoute>
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/logs"
            element={
              <AdminRoute>
                <DashboardLayout>
                  <SystemLogs />
                </DashboardLayout>
              </AdminRoute>
            }
          />
          
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Chatbot />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route for 404 */}
          <Route path="*" element={<div>Page not found - 404</div>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;