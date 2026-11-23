import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      // Storage can be blocked in private browsing modes.
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (saved === null && prefersDark);
    document.documentElement.classList.toggle('dark', dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const dark = !html.classList.contains('dark');
    html.classList.toggle('dark', dark);
    setIsDark(dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // The user can still switch themes for the current session.
    }
  };

  return (
    <button
      type="button"
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
} 