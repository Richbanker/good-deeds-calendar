/**
 * Возвращает массив чисел дней месяца (например, [1, 2, 3, ..., 30]).
 */
export function getDaysInMonth(year: number, month: number): number[] {
  const totalDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: totalDays }, (_, i) => i + 1);
}

/**
 * Возвращает текущую дату в виде { year, month, day }.
 */
export function getToday(): { year: number; month: number; day: number } {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(), // 0-based (0 = Январь)
    day: now.getDate(),
  };
}

/**
 * Приводит дату к строке формата 'YYYY-MM-DD'.
 */
export function formatDate(year: number, month: number, day: number): string {
  const monthStr = String(month + 1).padStart(2, '0'); // month: 0-11
  const dayStr = String(day).padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
}
