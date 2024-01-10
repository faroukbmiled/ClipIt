import React, { useState, useEffect } from "react";
import searchFilterIcon from "@assets/icons/search-filter.svg";

function FilterListingClips({ gameCategories, onSearch, searchQuery, setSearchQuery, hashtags }) {

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div id="FilterListingClips">
      <div className="FilterListingClips-wrapper pd40-r-l">
        <div className="filterSearch fl_row">
          <input
            className="rd10 txt_white p16 pd40-r-l"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="btn-search rd10">
            <img src={searchFilterIcon.src} alt="" />
          </div>
        </div>
        <div className="fl_row w-100 jc_s gp40">
          <div className="categories-filter  pd20-t-b fl_row fl-1">
            <div className="cat-wrapper fl_col">
              {gameCategories && gameCategories.length > 0 && (
                <ul className="fl_row gp5 categories_list">
                  {gameCategories.map((category, index) => (
                    <li key={index} className="p12 txt_white list-item pd5-t-b pd20-r-l rd30">{category}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="tags-filter pd20-t-b fl_row fl-1">
            <ul className="fl_row gp5 tags_list">
              {hashtags && hashtags.map((tag, index) => (
                <li key={index} className="p12 txt_white list-item pd5-t-b pd20-r-l rd30">#{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterListingClips;
