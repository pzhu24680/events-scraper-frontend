import React from 'react';
import { clearToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        You have successfully logged out
      </h2>
    </div>
  );
};

export default Logout;