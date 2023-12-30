import searchFilterIcon from "../../src/assets/Icons/search-filter.svg"

function FilterListingClips() {
    return (
        <div id="FilterListingClips">
            <div className="FilterListingClips-wrapper pd40-r-l">
                <div className="filterSearch fl_row">
                    <input className="rd10 txt_white p16 pd40-r-l" type="text" placeholder="Search" />
                    <div className="btn-search rd10">
                        <img src={searchFilterIcon.src} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterListingClips;