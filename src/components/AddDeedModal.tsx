import { useState, useEffect, useRef } from 'react';

const PRESET_DEEDS = [
  { icon: '❤️', text: 'Сделал комплимент' },
  { icon: '🤝', text: 'Помог другу' },
  { icon: '📚', text: 'Прочитал книгу' },
  { icon: '🧹', text: 'Убрал в комнате' },
];

const EMOJI_LIST = ['🌟', '🍏', '🧸', '📝', '🧑‍🍳', '🎨', '🛒', '🦷', '🦄', '🏆'];

interface AddDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (icon: string, text: string) => void;
}

export default function AddDeedModal({ isOpen, onClose, onSave }: AddDeedModalProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [customText, setCustomText] = useState('');
  const [customIcon, setCustomIcon] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-96 max-w-full modal-scrollable shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800 dark:text-yellow-300">Что хорошего ты сделал сегодня?</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {PRESET_DEEDS.map((deed, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelected(idx);
                setCustomText('');
                setCustomIcon('');
              }}
              className={`p-3 rounded-xl border font-medium flex gap-2 items-center justify-center text-sm
                ${selected === idx
                  ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                  : 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-gray-700 dark:text-yellow-100'}`}
            >
              <span>{deed.icon}</span>
              <span>{deed.text}</span>
            </button>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Свое доброе дело..."
          className="border rounded-lg px-3 py-2 w-full mb-4 text-black dark:text-white dark:bg-gray-700"
          value={customText}
          onChange={(e) => {
            setCustomText(e.target.value);
            setSelected(null);
          }}
        />

        <div className="grid grid-cols-5 gap-2 mb-4">
          {EMOJI_LIST.map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomIcon(emoji);
                setSelected(null);
              }}
              className={`text-xl p-2 rounded-lg border
                ${customIcon === emoji ? 'bg-yellow-100 border-yellow-400' : 'bg-blue-100 border-blue-200 dark:bg-gray-600'}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="или свой 😊"
          className="border rounded-lg px-3 py-2 w-full mb-4 text-black dark:text-white dark:bg-gray-700"
          value={customIcon}
          onChange={(e) => {
            setCustomIcon(e.target.value);
            setSelected(null);
          }}
          maxLength={2}
        />

        <div className="flex justify-center gap-4">
          <button
            disabled={selected === null && (!customText || !customIcon)}
            onClick={() => {
              if (selected !== null) onSave(PRESET_DEEDS[selected].icon, PRESET_DEEDS[selected].text);
              else onSave(customIcon, customText);
              onClose();
            }}
            className="bg-yellow-300 text-yellow-900 px-4 py-2 rounded-xl font-bold hover:bg-yellow-400 shadow active:scale-95"
          >
            Сохранить
          </button>
          <button
            className="bg-gray-300 dark:bg-gray-500 text-gray-900 px-4 py-2 rounded-xl font-bold hover:bg-gray-400 shadow active:scale-95"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
