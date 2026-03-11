import { Button } from './components/ui/button';
import { type TranslationKeys } from './i18n';

export interface Achievement {
  id: string;
  iconPath: string;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  value: number;
}

interface AchievementsModalProps {
  achievements: Achievement[];
  unlockedIds: Set<string>;
  onClose: () => void;
  t: (key: TranslationKeys) => string;
}

export function AchievementsModal({ achievements, unlockedIds, onClose, t }: AchievementsModalProps) {
  const sorted = [...achievements].sort((a, b) => {
    const aUnlocked = unlockedIds.has(a.id);
    const bUnlocked = unlockedIds.has(b.id);
    if (aUnlocked !== bUnlocked) return aUnlocked ? -1 : 1;
    return t(a.titleKey).localeCompare(t(b.titleKey));
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
      <div className="bg-white p-4 rounded-xl space-y-4 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <h2 className="font-bold text-xl border-b-2 border-yellow-400 pb-2">
          🏆 {t('achievements')} ({unlockedIds.size}/{achievements.length})
        </h2>

        <div className="overflow-y-auto flex-1 pr-1">
          <div className="grid grid-cols-1 gap-2">
            {sorted.map((ach) => {
              const unlocked = unlockedIds.has(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    unlocked
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={ach.iconPath}
                      alt={t(ach.titleKey)}
                      className={`w-full h-full object-cover ${!unlocked ? 'grayscale brightness-50' : ''}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${unlocked ? 'text-yellow-800' : 'text-gray-400'}`}>
                      {unlocked ? '✅' : '🔒'} {t(ach.titleKey)}
                    </p>
                    <p className={`text-xs mt-0.5 ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {t(ach.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button onClick={onClose}>{t('close')}</Button>
        </div>
      </div>
    </div>
  );
}