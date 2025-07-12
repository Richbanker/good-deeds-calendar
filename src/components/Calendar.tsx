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

const Calendar = ({ year, month, deeds, today, onDayClick }: CalendarProps) => {
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
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 drop-shadow-md text-center">
        <span style={{ fontSize: '3rem', fontWeight: 900, color: '#7c3aed' }}>{MONTHS[month]} {year}</span>
      </div>

      <table style={{ fontSize: '2rem' }}>
        <thead>
          <tr>
            {WEEKDAYS.map((w) => (
              <th
                key={w}
                style={{ padding: '18px', fontWeight: 700, fontSize: '2rem', fontFamily: 'Nunito, system-ui, sans-serif', color: '#2563eb' }}
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                if (!day) {
                  return <td key={j} style={{ width: 80, height: 80 }} />;
                }

                const dateStr = formatDate(year, month, day);
                const deed = deeds[dateStr];
                const isToday = day === today;

                return (
                  <td key={j} style={{ padding: 8 }}>
                    <button
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 16,
                        fontSize: '2rem',
                        fontWeight: 900,
                        fontFamily: 'Nunito, system-ui, sans-serif',
                        border: isToday ? '2px solid #facc15' : '2px solid #a5b4fc',
                        background: isToday ? '#fef3c7' : 'rgba(255,255,255,0.8)',
                        color: isToday ? '#b45309' : '#2563eb',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: deed ? '0 0 0 4px #fde68a' : undefined
                      }}
                      onClick={() => onDayClick(day)}
                    >
                      <span>{day}</span>
                      {deed?.icon && <span style={{ fontSize: '2rem' }}>{deed.icon}</span>}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
