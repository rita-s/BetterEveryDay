import { useState } from 'react';

export default function CategoryFilter({ categories, onFilter }) {
  const [active, setActive] = useState('all');

  const handleClick = (category) => {
    setActive(category);
    onFilter(category);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => handleClick('all')}
        className={`px-4 py-2 rounded-full transition ${
          active === 'all'
            ? 'bg-primary text-white'
            : 'bg-white/10 hover:bg-white/20 dark:bg-black/30 dark:hover:bg-black/50'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-4 py-2 rounded-full transition ${
            active === category
              ? 'bg-primary text-white'
              : 'bg-white/10 hover:bg-white/20 dark:bg-black/30 dark:hover:bg-black/50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
