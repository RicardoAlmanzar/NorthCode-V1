import { useState, useMemo } from 'react';

export function FocusCards({ cards = [], renderCard, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = useMemo(() => cards, [cards]);

  return (
    <div className={className}>
      {items.map((card, index) => {
        const isActive = activeIndex === null || activeIndex === index;
        const cardKey = card.key ?? card.title ?? index;

        return (
          <div
            key={cardKey}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            className={`transition-all duration-300 ${isActive ? 'opacity-100 blur-0' : 'opacity-40 blur-sm'} focus-within:opacity-100 focus-within:blur-0`}
          >
            {renderCard ? renderCard(card, index) : (
              <div className="relative overflow-hidden rounded-[1.5rem] shadow-xl shadow-black/10 bg-slate-900">
                <img src={card.src} alt={card.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/25 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
