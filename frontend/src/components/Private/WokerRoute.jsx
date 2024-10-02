import React, { useEffect } from 'react';
import ProtectedRoute from './PrivateRoute';

const WorkerRoute = ({ children }) => {

  // Render the protected component if authenticated
  return <ProtectedRoute  children={children} requiredRole={"WORKER"}/>
};

export default WorkerRoute;