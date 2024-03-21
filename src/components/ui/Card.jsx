import React from 'react';

export function Card({ children, darkMode }) {
  return (
    <div className="max-w-md w-full p-10 rounded-t-3xl" style={{ backgroundColor: darkMode ? '#28262B' : '#28262B' }}>
      {children}
    </div>
  );
}