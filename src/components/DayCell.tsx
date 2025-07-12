import React from 'react';

export interface DayCellProps {
  day: number;
  isToday: boolean;
  deedIcon?: string;
  onClick: () => void;
}

const DayCell = ({ day, isToday, deedIcon, onClick }: DayCellProps) => {
  return (
    <button
      className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex flex-col items-center justify-center text-lg font-bold transition-all duration-200
        ${isToday ? 'bg-yellow-100 text-blue-900 scale-110' : 'bg-white/90 text-blue-800'}
        ${deedIcon ? 'text-green-700' : ''} shadow hover:scale-110`}
      onClick={onClick}
      aria-label={`День ${day}${isToday ? ' (сегодня)' : ''}${deedIcon ? ', доброе дело: ' + deedIcon : ''}`}
    >
      <span>{day}</span>
      {deedIcon && <span className="text-2xl mt-1">{deedIcon}</span>}
    </button>
  );
};

export default DayCell;
