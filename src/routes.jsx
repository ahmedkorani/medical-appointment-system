// src/lazyPages.js
import React from 'react';

const Login = React.lazy(() => import('./pages/Login'));
const RoleSelector = React.lazy(() => import('./pages/RoleSelector'));
const PatientDashboard = React.lazy(() => import('./pages/PatientDashboard'));
const ClinicDashboard = React.lazy(() => import('./pages/ClinicDashboard'));

export { Login, RoleSelector, PatientDashboard, ClinicDashboard };
