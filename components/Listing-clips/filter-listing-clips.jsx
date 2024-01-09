import React, { useState } from "react";
import searchFilterIcon from "@assets/icons/search-filter.svg";

function FilterListingClips({ onSearch, searchQuery, setSearchQuery }) {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  // const handleSearch = () => {
  //   onSearch(searchQuery);
  // };

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
      </div>
    </div>
  );
}

export default FilterListingClips;
