import React from 'react';

interface RerollButtonProps {
  onReroll: () => void;
  isLoading: boolean;
}

const RerollButton: React.FC<RerollButtonProps> = ({ onReroll }) => {
  return (
    <button onClick={onReroll} className="reroll-button">
      Reroll Movies
    </button>
  );
};

export default RerollButton;