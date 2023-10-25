// src/AccountPage.js
import React from 'react';
import { useAuth } from './AuthContext';

function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="AccountPage">
      {user ? (
        <div>
          <h1>Welcome to Galeria</h1>
          <p>Hello, {user.username}!</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default AccountPage;
