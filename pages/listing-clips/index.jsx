import FilterListingClips from "../../components/Listing-clips/filter-listing-clips";
import ListingClipsComponents from "../../components/Listing-clips/listing-clips.components";
import MostFollowedUsersListing from "../../components/Listing-clips/most-followed-users";
import NavOptions from "../../components/Listing-clips/nav-options";
import Header from "../../components/header/header";
function ListingClipsPage() {
    return (
        <div id="page-content" className="listingClips-Page ">
            <div className="pd40" id="header">
                <Header></Header>
            </div>
            <div id="body">
                <div id="ListingClips">
                    <div className="ListingClips-wrapper fl_row gp24">
                        <div className="nav-bar">
                            <NavOptions></NavOptions>
                            <hr className="mg20-t-b rd25" />
                            <MostFollowedUsersListing></MostFollowedUsersListing>
                        </div>
                        <div className="listing-clips fl_col gp40">
                            <FilterListingClips></FilterListingClips>
                            <ListingClipsComponents></ListingClipsComponents>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer">
            </div>
        </div>
    )
}

export default ListingClipsPage;



