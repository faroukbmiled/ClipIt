import MostFollowedUsers from "../../components/HomeBlocks/most_followed_users";
import PrimaryBlock from "../../components/HomeBlocks/primary-block";
import ListingLatestClips from "../../components/latest-clips/Listing-latest-clips";

function HomePage() {
  return (
    <div className="fl_col" id="Home">
      <PrimaryBlock></PrimaryBlock>
      <MostFollowedUsers></MostFollowedUsers>
      <ListingLatestClips></ListingLatestClips>
    </div>
  );
}

export default HomePage;
