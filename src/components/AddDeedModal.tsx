import React, { useState, useEffect, useRef } from "react";
import type { GoodDeed } from "../store/useAppStore";

interface AddDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (icon: string, text: string) => void;
  onRemove?: () => void;
  existingDeed?: GoodDeed | null;
}

const PRESET_DEEDS = [
  { icon: "❤️", text: "Сделал комплимент" },
  { icon: "🤝", text: "Помог другу" },
  { icon: "📚", text: "Прочитал книгу" },
  { icon: "🧸", text: "Поделился игрушкой" },
  { icon: "🧹", text: "Убрал в комнате" },
];

const EMOJI_LIST = [
  "🌸", "🌻", "🌼", "🍀", "🌈", "🌞",
  "🐝", "🦋", "⭐", "💫", "🌟", "❤️",
  "🤗", "🎁", "🍎", "🍭", "🚀", "🧩",
  "😃", "😇", "😎", "🥰", "😺", "🐶"
];

export default function AddDeedModal({
  isOpen,
  onClose,
  onSave,
  onRemove,
  existingDeed,
}: AddDeedModalProps) {
  const [icon, setIcon] = useState("");
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingDeed) {
      setIcon(existingDeed.icon);
      setText(existingDeed.text);
    } else {
      setIcon("");
      setText("");
    }
  }, [existingDeed, isOpen]);

  // Скрывать emoji picker при клике вне
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node) &&
        iconInputRef.current &&
        !iconInputRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (icon && text) {
      onSave(icon, text);
      onClose(); // Закрыть модалку после сохранения
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{existingDeed ? "Редактировать/удалить" : "Новое доброе дело"}</h2>

        <div className="preset-deeds">
          {PRESET_DEEDS.map((deed, idx) => (
            <button
              key={idx}
              className={`preset-btn ${text === deed.text ? "active" : ""}`}
              onClick={() => {
                setIcon(deed.icon);
                setText(deed.text);
              }}
            >
              {deed.icon} {deed.text}
            </button>
          ))}
        </div>

        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Иконка (например 🌸)"
            value={icon}
            maxLength={2}
            onChange={e => setIcon(e.target.value)}
            onFocus={() => setShowEmojiPicker(true)}
            ref={iconInputRef}
            autoComplete="off"
          />
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                background: "#fff",
                border: "1.5px solid #ffb3e6",
                borderRadius: 8,
                boxShadow: "0 2px 8px #ffb3e633",
                padding: 8,
                zIndex: 10,
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 4,
                minWidth: 180
              }}
            >
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.3em",
                    cursor: "pointer",
                    padding: 2
                  }}
                  onClick={() => {
                    setIcon(emoji);
                    setShowEmojiPicker(false);
                    iconInputRef.current?.focus();
                  }}
                  tabIndex={-1}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Своё доброе дело..."
          value={text}
          maxLength={40}
          onChange={e => setText(e.target.value)}
        />

        <div className="modal-actions">
          {existingDeed && onRemove && (
            <button className="btn-remove" onClick={onRemove}>
              ❌ Удалить
            </button>
          )}
          <button
            className="btn-save"
            disabled={!icon || !text}
            onClick={handleSave}
          >
            ✅ Сохранить
          </button>
          <button className="btn-close" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
