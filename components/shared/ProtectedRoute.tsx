import { memo } from 'react';

const ProtectedRoute = () => {
  return (
    <div>
      <h2>ProtectedRoute</h2>
    </div>
  );
};

export default memo(ProtectedRoute);