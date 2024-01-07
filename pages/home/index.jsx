import MostFollowedUsers from "../../components/HomeBlocks/most_followed_users";
import PrimaryBlock from "../../components/HomeBlocks/primary-block";
import LatestClipsComponent from "../../components/latest-clips";
import LatestUsersList from "../../components/HomeBlocks/users-list";
function HomePage() {
  return (
    <div className="fl_col" id="Home">
      <PrimaryBlock></PrimaryBlock>
      <MostFollowedUsers></MostFollowedUsers>
      <LatestClipsComponent></LatestClipsComponent>
      <LatestUsersList></LatestUsersList>
    </div>
  );
}

export default HomePage;
