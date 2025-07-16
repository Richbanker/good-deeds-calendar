import type { GoodDeed } from "../store/useAppStore";


const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
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
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export default function Calendar({
  year,
  month,
  deeds,
  today,
  onDayClick,
}: CalendarProps) {
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
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{MONTHS[month]} {year}</h2>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((w) => (
          <div key={w} className="weekday">{w}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {weeks.flat().map((day, index) => {
          if (!day) return <div key={index} className="calendar-cell empty" />;

          const dateStr = formatDate(year, month, day);
          const deed = deeds[dateStr];
          const isToday = day === today;

          return (
            <button
              key={index}
              onClick={() => onDayClick(day)}
              className={`calendar-cell ${isToday ? "today" : ""} ${deed ? "has-deed" : ""}`}
            >
              <span className="day-number">{day}</span>
              {deed?.icon && <span className="day-icon">{deed.icon}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
