// src/components/SocialButton.jsx
import React from 'react';

export default function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 justify-center w-full py-2 border border-gray-200 rounded-md text-sm hover:shadow-sm"
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
