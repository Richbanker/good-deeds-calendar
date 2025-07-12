import type { GoodDeed } from '../store/useAppStore';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

interface CalendarProps {
  year: number;
  month: number;
  deeds: Record<string, GoodDeed>;
  today: number;
  onDayClick: (day: number) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function Calendar({ year, month, deeds, today, onDayClick }: CalendarProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(offset).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return (
    <div className="w-full p-2 calendar-wrapper">
      <div className="mb-4 text-center drop-shadow-md">
        <span className="text-[clamp(1.5rem,5vw,2.5rem)] font-black text-purple-600 dark:text-yellow-300">
          {MONTHS[month]} {year}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm font-bold text-blue-600 dark:text-yellow-200 w-full max-w-md mx-auto mb-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center py-1">{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 w-full max-w-md mx-auto">
        {weeks.flat().map((day, index) => {
          if (!day) return <div key={index} className="aspect-square" />;
          const dateStr = formatDate(year, month, day);
          const deed = deeds[dateStr];
          const isToday = day === today;

          return (
            <button
              key={index}
              onClick={() => onDayClick(day)}
              className={`
                aspect-square rounded-xl font-bold flex flex-col items-center justify-center text-[clamp(1rem,4vw,1.25rem)]
                transition-all border-2 shadow-sm
                ${isToday ? 'bg-yellow-100 border-yellow-400 text-amber-700' : 'bg-white/80 border-indigo-300 text-blue-600 dark:bg-gray-700 dark:text-yellow-100 dark:border-gray-500'}
                ${deed ? 'shadow-[0_0_0_4px_#fde68a]' : ''}
              `}
            >
              <span>{day}</span>
              {deed?.icon && <span className="text-xl">{deed.icon}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
