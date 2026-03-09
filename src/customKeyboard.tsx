// Composant clavier custom
export const CustomKeyboard = ({ value, onChange, onClose, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  placeholder?: string;
}) => {
  const keys = [
    ['A','B','C','D','E','F','G'],
    ['H','I','J','K','L','M','N'],
    ['O','P','Q','R','S','T','U'],
    ['V','W','X','Y','Z',' ','⌫'],
  ];

  const handleKey = (key: string) => {
    if (key === '⌫') onChange(value.slice(0, -1));
    else if (value.length < 20) onChange(value + key);
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-xl border mt-1">
      {/* Affichage valeur */}
      <div className="bg-white border-2 border-blue-400 rounded-lg p-2 text-center font-bold tracking-widest min-h-[2rem]">
        {value || <span className="text-gray-400 font-normal">{placeholder}</span>}
      </div>

      {/* Touches */}
      {keys.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {row.map(key => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`
                flex-1 py-2 rounded-lg font-bold text-sm
                ${key === '⌫' ? 'bg-red-200 text-red-700' : 
                  key === ' ' ? 'bg-gray-300 text-gray-600' : 
                  'bg-white text-gray-800'}
                active:scale-95 active:bg-blue-100
                border border-gray-300 shadow-sm
              `}
            >
              {key === ' ' ? '␣' : key}
            </button>
          ))}
        </div>
      ))}

      {/* Valider */}
      <button
        onClick={onClose}
        className="bg-blue-500 text-white rounded-lg py-2 font-bold mt-1"
      >
        ✓ OK
      </button>
    </div>
  );
};