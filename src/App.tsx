import { useState } from 'react';
import Calendar from './components/Calendar';
import AddDeedModal from './components/AddDeedModal';
import { useAppStore } from './store/useAppStore';
import { getToday, formatDate } from './utils/dateUtils';
import './App.css';

export default function App() {
  const today = getToday();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const deeds = useAppStore((s) => s.deeds);
  const addDeed = useAppStore((s) => s.addDeed);

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

  return (
    <div
      className="w-screen h-screen grid place-items-center bg-cover"
      style={{ backgroundImage: 'url(/src/assets/1640341864_26-abrakadabra-fun-p-fon-igrushki-dlya-detei-27.jpg)' }}
    >
      <div className="flex flex-col items-center">
      {/* Заголовок */}
      <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-2 text-center" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2px' }}>
        {"Календарь хороших дел".split('').map((char, i) => (
          <span key={i} className="letter-animate">{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </h1>
      <p className="jump-text text-2xl mb-6 text-center" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1px', color: 'white' }}>
        {"Отмечай свои добрые поступки каждый день!".split('').map((char, i) => (
          <span key={i} className="jump-letter">{char === ' ' ? '\u00A0' : char}</span>
        ))}
      </p>

      {/* Блок календаря */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
        <Calendar
          year={year}
          month={month}
          deeds={deeds}
          today={today.day}
          onDayClick={handleDayClick}
        />
      </div>

      {/* Модальное окно */}
      <AddDeedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveDeed}
      />
      </div>
    </div>
  );
}
