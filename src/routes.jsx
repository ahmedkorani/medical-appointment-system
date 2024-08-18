import React from 'react';

const Login = React.lazy(() => import('./pages/Login'));
const RoleSelector = React.lazy(() => import('./pages/RoleSelector'));
const PatientDashboard = React.lazy(() => import('./pages/PatientDashboard'));
const ClinicDashboard = React.lazy(() => import('./pages/ClinicDashboard'));
const Home = React.lazy(() => import("./pages/Home"));

export { Login, RoleSelector, PatientDashboard, ClinicDashboard, Home};
