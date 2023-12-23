import MostFollowedUsers from "../../components/HomeBlocks/most_followed_users";
import PrimaryBlock from "../../components/HomeBlocks/primary-block";

function HomePage() {
    return (
        <div id="Home">
            <PrimaryBlock></PrimaryBlock>
            <MostFollowedUsers></MostFollowedUsers>
        </div>
    );
}


export default HomePage;
