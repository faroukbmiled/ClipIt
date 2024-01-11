import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import FilterListingClips from "../../components/Listing-clips/filter-listing-clips";
import ListingClipsComponents from "../../components/Listing-clips/listing-clips.components";
import UserFollowingList from "../../components/Listing-clips/user-following-list";
import NavOptions from "../../components/Listing-clips/nav-options";
import Header from "../../components/header/header";
import Head from "next/head";

function ListingClipsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [videosData, setVideosData] = useState([]);
  const [gameCategories, setGameCategories] = useState();
  const [hashtags, setHashtags] = useState();
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setFilteredVideos(videosData);
    } else {
      if (videosData) {
        if (searchQuery.toLowerCase().startsWith("hashtag:")) {
          const hashtag = searchQuery.slice(8).trim();
          const filtered = videosData?.filter((video) =>
            String(video.hashtag).toLowerCase().includes(hashtag.toLowerCase())
          );
          setFilteredVideos(filtered);
        } else if (searchQuery.toLowerCase().startsWith("category:")) {
          const category = searchQuery.slice(9).trim();
          const filtered = videosData?.filter((video) =>
            String(video.game_category)
              .toLowerCase()
              .includes(category.toLowerCase())
          );
          setFilteredVideos(filtered);
        } else {
          const filtered = videosData?.filter(
            (video) =>
              String(video.video_title)
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              String(video.username)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          );
          setFilteredVideos(filtered);
        }
      }
    }
    router.push({
      pathname: router.pathname,
      query: { search: searchQuery },
    });
  };
  useEffect(() => {
    const fetchClips = async () => {
      try {
        const response = await axios.get("/api/videos/getClips");
        setVideosData(response.data.videos);
        setFilteredVideos(response.data.videos);
        setGameCategories(response.data.game_categories);
        const hashtags = response.data.videos.reduce((allHashtags, video) => {
          const videoHashtags = video.hashtag || [];
          return allHashtags.concat(videoHashtags);
        }, []);
        const uniqueHashtags = Array.from(new Set(hashtags));
        setHashtags(uniqueHashtags);
      } catch (error) {
        console.error("Error fetching latest clips:", error);
      }
    };

    fetchClips();
  }, []);

  useEffect(() => {
    const initialSearchQuery = router.query.search;
    if (initialSearchQuery && filteredVideos) {
      handleSearch(initialSearchQuery);
      setSearchQuery(initialSearchQuery);
    }
  }, [router.query.search, videosData]);

  return (
    <>
      <Head>
        <title>Clipit - Clips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                <UserFollowingList session={session}></UserFollowingList>
              </div>
              <div className="listing-clips fl_col gp20">
                {gameCategories && gameCategories.length > 0 ? (
                  <FilterListingClips
                    gameCategories={gameCategories}
                    hashtags={hashtags}
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                ) : null}

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
    </>
  );
}

export default ListingClipsPage;
