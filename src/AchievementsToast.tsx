import { useEffect, useRef, useState } from "react";
import { type Achievement } from "./AchievementsModal";
import { type TranslationKeys } from "./i18n";

interface ToastEntry {
  achievement: Achievement;
  id: number;
}

interface AchievementToastProps {
  queue: ToastEntry[];
  onDismiss: (id: number) => void;
  t: (key: TranslationKeys) => string;
}

export function AchievementToast({ queue, onDismiss, t }: AchievementToastProps) {
  const [visible, setVisible] = useState<ToastEntry[]>([]);

  const processingRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (queue.length === 0) return;
    const next = queue[0];

    if (processingRef.current.has(next.id)) return;
    processingRef.current.add(next.id);

    setVisible(prev => [...prev, next]);

    const timer = setTimeout(() => {
        setVisible(prev => prev.filter(v => v.id !== next.id));
        setTimeout(() => {
        onDismiss(next.id);
        processingRef.current.delete(next.id);
        }, 400);
    }, 10000);

    return () => clearTimeout(timer);
  }, [queue]);

  if (visible.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 items-end">
      {visible.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center gap-3 p-3 rounded-lg border-2 border-yellow-400 bg-yellow-50 shadow-xl w-72 animate-[slideInRight_0.3s_ease-out]"
          style={{ animation: 'slideInRight 0.3s ease-out' }}
        >
          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-yellow-300">
            <img
              src={entry.achievement.iconPath}
              alt={t(entry.achievement.titleKey)}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-yellow-600 uppercase tracking-wide">🏆 {t('achievementUnlocked')}</p>
            <p className="font-bold text-sm text-yellow-800 truncate">{t(entry.achievement.titleKey)}</p>
            <p className="text-xs text-gray-600 line-clamp-2">{t(entry.achievement.descKey)}</p>
          </div>
          <button
            onClick={() => {
              setVisible(prev => prev.filter(v => v.id !== entry.id));
              setTimeout(() => onDismiss(entry.id), 400);
            }}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 self-start"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}