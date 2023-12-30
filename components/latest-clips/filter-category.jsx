import React, { useState, useEffect } from "react";

function FilterCategory({ videosData, onFilterChange }) {
  const gameCategories = ["All", ...(videosData?.game_categories || [])];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategoryClick = (index) => {
    const selectedCategory = index === 0 ? null : gameCategories[index];
    setActiveIndex(index);
    onFilterChange(selectedCategory);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [videosData]);

  return (
    <div id="FilterCategory">
      <div className="wrapper">
        <ul className="fl_row gp20 filter-list rd30 pd10-t-b pd20-r-l">
          {gameCategories.map((category, index) => (
            <li
              className={`cat-el p18 pd40-r-l rd30 pd10-t-b w-600 txt_white pointer ${
                index === activeIndex ? "active" : ""
              }`}
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
