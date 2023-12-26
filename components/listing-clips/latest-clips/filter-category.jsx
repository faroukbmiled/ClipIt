import React, { useState } from 'react';
import videoData from '../../data/data.json';

function FilterCategory() {
  const gameCategories = videoData.game_categories || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategoryClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div id="FilterCategory">
      <div className="wrapper">
        <ul className="fl_row gp20 filter-list rd30 pd10-t-b pd20-r-l">
          {gameCategories.map((category, index) => (
            <li
              className={`cat-el p18 pd40-r-l rd30 pd10-t-b w-600 txt_white pointer ${index === activeIndex ? 'active' : ''}`}
              key={index}
              onClick={() => handleCategoryClick(index)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterCategory;
