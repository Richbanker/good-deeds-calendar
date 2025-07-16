import { useState } from "react";
import Calendar from "./components/Calendar";
import AddDeedModal from "./components/AddDeedModal";
import { useAppStore } from "./store/useAppStore";
import { getToday, formatDate } from "./utils/dateUtils";
import "./App.css";

export default function App() {
  const today = getToday();
  const deeds = useAppStore((s) => s.deeds);
  const addDeed = useAppStore((s) => s.addDeed);
  const removeDeed = useAppStore((s) => s.removeDeed);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = today.year;
  const month = today.month;

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  const handleSaveDeed = (icon: string, text: string) => {
    if (selectedDay) {
      const date = formatDate(year, month, selectedDay);
      addDeed({ date, icon, text });
    }
  };

  const handleRemoveDeed = () => {
    if (selectedDay) {
      const date = formatDate(year, month, selectedDay);
      removeDeed(date);
    }
  };

  const selectedDate =
    selectedDay !== null ? formatDate(year, month, selectedDay) : null;
  const existingDeed = selectedDate ? deeds[selectedDate] : null;

  return (
    <div className="app-wrapper">
      {/* ✅ Декор */}
      <div className="background-decor">
        <div className="sun">☀️</div>
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="bee bee1">🐝</div>
        <div className="bee bee2">🐝</div>
      </div>

      {/* ✅ Заголовок */}
      <header className="app-header">
        <h1 className="title">Календарь добрых дел</h1>
        <p className="subtitle">Отмечай свои добрые поступки каждый день!</p>
      </header>

      {/* ✅ Календарь */}
      <section className="calendar-section">
        <Calendar
          year={year}
          month={month}
          deeds={deeds}
          today={today.day}
          onDayClick={handleDayClick}
        />
      </section>

      {/* ✅ Блоки To-Do / Заметки / Цели */}
      <section className="info-cards">
        <div className="info-card todo">
          <h3>📝 To-Do List</h3>
          <ul>
            <li>✅ Сделать комплимент</li>
            <li>✅ Помочь другу</li>
            <li>✅ Прочитать книгу</li>
          </ul>
        </div>

        <div className="info-card notes">
          <h3>💡 Заметки</h3>
          <p>Сегодня я сделал что-то хорошее 🐝</p>
        </div>

        <div className="info-card goals">
          <h3>🎯 Цели месяца</h3>
          <ul>
            <li>🌱 Посадить растение</li>
            <li>🧹 Убрать в комнате</li>
            <li>🥗 Есть полезную еду</li>
          </ul>
        </div>
      </section>

      {/* ✅ Модальное окно */}
      <AddDeedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveDeed}
        existingDeed={existingDeed ?? null}
        onRemove={handleRemoveDeed}
      />
    </div>
  );
}
