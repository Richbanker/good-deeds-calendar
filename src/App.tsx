import { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import AddDeedModal from './components/AddDeedModal';
import { useAppStore } from './store/useAppStore';
import { getToday, formatDate } from './utils/dateUtils';
import './App.css';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  ready: () => void;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    onClick: (callback: () => void) => void;
  };
  sendData: (data: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export default function App() {
  const today = getToday();
  const [modalOpen, setModalOpen] = useAppStore((s) => [s.modalOpen, s.setModalOpen]);
  const [selectedDay, setSelectedDay] = useAppStore((s) => [s.selectedDay, s.setSelectedDay]);
  const deeds = useAppStore((s) => s.deeds);
  const addDeed = useAppStore((s) => s.addDeed);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const telegramUser = tg.initDataUnsafe?.user;
      if (telegramUser) {
        setUser(telegramUser);
        console.log('Пользователь:', telegramUser);
      }
    }
  }, []);

  const year = today.year;
  const month = today.month;

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  const handleSaveDeed = (icon: string, text: string) => {
    if (selectedDay) {
      const date = formatDate(year, month, selectedDay);
      const deedData = { date, icon, text };
      addDeed(deedData);
      
      // Показываем кнопку "Поделиться делом"
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.MainButton.setText('Поделиться делом');
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
          tg.sendData(JSON.stringify({
            type: 'good_deed',
            text: `${icon} ${text}`,
            date: date
          }));
        });
      }
    }
  };

  return (
    <div
      className="w-screen h-screen grid place-items-center bg-cover dark:bg-gray-900"
      style={{ backgroundImage: theme === 'light' ? 'url(/src/assets/1640341864_26-abrakadabra-fun-p-fon-igrushki-dlya-detei-27.jpg)' : 'none' }}
    >
      <div className="flex flex-col items-center">
        {user && (
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold text-white dark:text-gray-200 mb-2">
              Привет, {user.first_name}!
            </p>
            {user.photo_url && (
              <img 
                src={user.photo_url} 
                alt="Avatar" 
                className="w-12 h-12 rounded-full mx-auto mb-2"
              />
            )}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-2 text-center text-blue-900 dark:text-yellow-300">
          {'Календарь хороших дел'.split('').map((char, i) => (
            <span key={i} className="letter-animate">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        <p className="jump-text text-2xl mb-6 text-center text-white dark:text-gray-200">
          {'Отмечай свои добрые поступки каждый день!'.split('').map((char, i) => (
            <span key={i} className="jump-letter">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </p>

        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="mb-4 px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 dark:bg-yellow-200 dark:text-yellow-800 shadow-md hover:scale-105"
        >
          Переключить тему
        </button>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg">
          <Calendar
            year={year}
            month={month}
            deeds={deeds}
            today={today.day}
            onDayClick={handleDayClick}
          />
        </div>

        <AddDeedModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveDeed}
        />
      </div>
    </div>
  );
}
