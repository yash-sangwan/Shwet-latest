import React, { useEffect } from 'react';
import ProtectedRoute from './PrivateRoute';

const ProviderRoute = ({ children }) => {
  // Render the protected component if authenticated

  return <ProtectedRoute  children={children} requiredRole={"PROVIDER"}/>
};

export default ProviderRoute;