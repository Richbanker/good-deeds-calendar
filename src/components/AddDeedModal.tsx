import React, { useState, useEffect, useRef } from 'react';

const PRESET_DEEDS = [
  { icon: '❤️', text: 'Сделал комплимент' },
  { icon: '🤝', text: 'Помог другу' },
  { icon: '📚', text: 'Прочитал книгу' },
  { icon: '🌟', text: 'Поделился игрушкой' },
  { icon: '🧹', text: 'Убрал в комнате' },
  { icon: '🍏', text: 'Съел полезную еду' },
  { icon: '🦮', text: 'Погулял с питомцем' },
  { icon: '🧸', text: 'Поиграл с младшим' },
  { icon: '📝', text: 'Сделал домашку' },
  { icon: '🌳', text: 'Посадил растение' },
  { icon: '🦷', text: 'Почистил зубы' },
  { icon: '🧑‍🍳', text: 'Помог приготовить еду' },
  { icon: '🧺', text: 'Помог с бельём' },
  { icon: '🧼', text: 'Помыл руки' },
  { icon: '🚲', text: 'Покатался на велосипеде' },
  { icon: '🎨', text: 'Нарисовал картину' },
  { icon: '🎵', text: 'Поиграл на инструменте' },
  { icon: '🛒', text: 'Сходил в магазин' },
  { icon: '💡', text: 'Придумал что-то новое' },
  { icon: '🦸‍♂️', text: 'Сделал доброе дело' },
];

const EMOJI_LIST = [
  '😊', '😃', '😇', '🐶', '🐱', '🦄', '🚀', '🌈', '🍭', '🍎',
  '🧸', '🎨', '🎈', '🏆', '💡', '🤗', '👑', '🦋', '🌻', '⭐',
  '🍀', '🥇', '🔑', '🦊', '🐻', '🐰', '🦉', '🐢', '🐥', '🐢',
];

interface AddDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (icon: string, text: string) => void;
}

function PresetDeedsList({ selected, setSelected, setCustomText, setCustomIcon }: {
  selected: number | null;
  setSelected: (n: number | null) => void;
  setCustomText: (s: string) => void;
  setCustomIcon: (s: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-6 justify-center mb-6">
      {PRESET_DEEDS.map((deed, idx) => (
        <button
          key={idx}
          className={`px-6 py-3 rounded-2xl border text-lg flex items-center gap-4 font-medium transition hover:scale-105 active:scale-95 ${
            selected === idx
              ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
              : 'bg-blue-100 border-blue-200 text-blue-800 hover:bg-yellow-50'
          }`}
          onClick={() => {
            setSelected(idx);
            setCustomText('');
            setCustomIcon('');
          }}
        >
          <span>{deed.icon}</span>
          <span>{deed.text}</span>
        </button>
      ))}
    </div>
  );
}

function EmojiPicker({ customIcon, setCustomIcon, setSelected }: {
  customIcon: string;
  setCustomIcon: (s: string) => void;
  setSelected: (n: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-5">
      {EMOJI_LIST.map((emoji, idx) => (
        <button
          key={idx}
          type="button"
          className={`text-2xl p-4 rounded-xl border transition hover:scale-110 active:scale-95 ${
            customIcon === emoji
              ? 'bg-yellow-100 border-yellow-400 text-yellow-800 scale-110'
              : 'bg-blue-100 border-blue-200 text-blue-800 hover:bg-yellow-50'
          }`}
          onClick={() => {
            setCustomIcon(emoji);
            setSelected(null);
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

export default function AddDeedModal({ isOpen, onClose, onSave }: AddDeedModalProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [customText, setCustomText] = useState('');
  const [customIcon, setCustomIcon] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl p-6 w-96 max-w-full max-h-[85vh] flex flex-col items-center overflow-y-auto shadow-2xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Что хорошего ты сделал сегодня?</h2>
        <PresetDeedsList selected={selected} setSelected={setSelected} setCustomText={setCustomText} setCustomIcon={setCustomIcon} />
        <div className="w-full flex flex-col gap-4 mb-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Свое доброе дело..."
            className="border rounded-lg px-3 py-2 text-base"
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              setSelected(null);
            }}
            maxLength={40}
          />
          <EmojiPicker customIcon={customIcon} setCustomIcon={setCustomIcon} setSelected={setSelected} />
          <input
            type="text"
            placeholder="или свой 😊"
            className="border rounded-lg px-3 py-2 text-base"
            value={customIcon}
            onChange={(e) => {
              setCustomIcon(e.target.value);
              setSelected(null);
            }}
            maxLength={2}
          />
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            className="bg-yellow-200 text-yellow-900 px-5 py-2 rounded-2xl font-bold hover:bg-yellow-300 shadow active:scale-95 transition"
            onClick={() => {
              if (selected !== null) {
                onSave(PRESET_DEEDS[selected].icon, PRESET_DEEDS[selected].text);
              } else if (customText && customIcon) {
                onSave(customIcon, customText);
              }
              onClose();
            }}
            disabled={selected === null && (!customText || !customIcon)}
          >
            Сохранить
          </button>
          <button
            className="bg-blue-100 text-blue-800 px-5 py-2 rounded-2xl font-bold hover:bg-blue-200 shadow active:scale-95 transition"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
