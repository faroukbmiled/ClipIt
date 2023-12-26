import ListingLatestClips from "./latest-clips/Listing-latest-clips";
import FilterCategory from "./latest-clips/filter-category";
function LatestClips() {
    return (
        <div id="LatestClips">
            <div className="wrapper fl_col gp60">
                <div className="FilterSection fl_row ai_c jc_s">
                    <p className="p60 txt_white w-700">Latest <span className="txt_primary">Clips</span></p>
                    <FilterCategory></FilterCategory>
                </div>
                <div className="Listing-clips">
                    <ListingLatestClips></ListingLatestClips>
                </div>
            </div>
        </div>
    );
}


export default LatestClips;
