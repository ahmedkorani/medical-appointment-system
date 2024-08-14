import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import { Login, RoleSelector, PatientDashboard, ClinicDashboard } from './routes';


// const Login = React.lazy(() => import('./pages/Login'));
// const RoleSelector = React.lazy(() => import('./pages/RoleSelector'));
// const PatientDashboard = React.lazy(() => import('./pages/PatientDashboard'));
// const ClinicDashboard = React.lazy(() => import('./pages/ClinicDashboard'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/role-selector" element={<RoleSelector />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/clinic-dashboard" element={<ClinicDashboard />} />
        </Routes>
      </React.Suspense>
    </Router>
  </React.StrictMode>
);