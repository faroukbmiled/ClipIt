import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import FilterListingClips from "../../components/Listing-clips/filter-listing-clips";
import ListingClipsComponents from "../../components/Listing-clips/listing-clips.components";
import UserFollowingList from "../../components/Listing-clips/user-following-list";
import NavOptions from "../../components/Listing-clips/nav-options";
import Header from "../../components/header/header";

function ListingClipsPage() {
  const { data: session, status } = useSession();
  const [videosData, setVideosData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setFilteredVideos(videosData);
    } else {
      if (videosData) {
        const filtered = videosData?.filter((video) =>
          Object.values(video).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setFilteredVideos(filtered);
      }
    }
  };
  useEffect(() => {
    const fetchClips = async () => {
      try {
        const response = await axios.get("/api/videos/getClips");
        setVideosData(response.data.videos);
        setFilteredVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching latest clips:", error);
      }
    };

    fetchClips();
  }, []);

  return (
    <div id="page-content" className="listingClips-Page ">
      <div className="pd40" id="header">
        <Header session={session} status={status} signOut={signOut}></Header>
      </div>
      <div id="body">
        <div id="ListingClips">
          <div className="ListingClips-wrapper fl_row gp24">
            <div className="nav-bar">
              <NavOptions></NavOptions>
              <hr className="mg20-t-b rd25" />
              <UserFollowingList></UserFollowingList>
            </div>
            <div className="listing-clips fl_col gp40">
              <FilterListingClips onSearch={handleSearch} />
              <ListingClipsComponents
                videosData={filteredVideos}
                setVideosData={setVideosData}
              ></ListingClipsComponents>
            </div>
          </div>
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default ListingClipsPage;
