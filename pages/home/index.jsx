import MostFollowedUsers from "../../components/HomeBlocks/most_followed_users";
import PrimaryBlock from "../../components/HomeBlocks/primary-block";
import LatestClips from "../../components/listing-clips";

function HomePage() {
  return (
    <div className="fl_col" id="Home">
      <PrimaryBlock></PrimaryBlock>
      <MostFollowedUsers></MostFollowedUsers>
      <LatestClips></LatestClips>
    </div>
  );
}

export default HomePage;
