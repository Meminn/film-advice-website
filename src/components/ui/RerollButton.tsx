import React from 'react';

interface RerollButtonProps {
  onReroll: () => void;
  isLoading: boolean;
}

const RerollButton: React.FC<RerollButtonProps> = ({ onReroll, isLoading }) => {
  return (
    <button
      onClick={onReroll}
      className="reroll-button px-6 py-3 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Reroll Movies'}
    </button>
  );
};

export default RerollButton;