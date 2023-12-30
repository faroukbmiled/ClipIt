import { useEffect, useState } from "react";
import axios from "axios";
import FilterCategory from "./filter-category";
import ListingLatestClips from "./Listing-latest-clips";

function LatestClipsComponent() {
  const [videosData, setVideosData] = useState(null);
  const [filteredCategory, setFilteredCategory] = useState(null);

  const handleFilterChange = (category) => {
    console.log(category);
    console.log(filteredVideos);
    setFilteredCategory(category);
  };

  useEffect(() => {
    const fetchLatestClips = async () => {
      try {
        const response = await axios.get("/api/videos/latestClips");
        setVideosData(response.data);
      } catch (error) {
        console.error("Error fetching latest clips:", error);
      }
    };

    fetchLatestClips();
  }, []);

  const filteredVideos = videosData?.videos.filter(
    (video) =>
      !filteredCategory ||
      video.game_category.toString() === filteredCategory.toString()
  );

  return (
    <div id="LatestClips">
      <div className="wrapper fl_col gp60">
        <div className="FilterSection fl_row ai_c jc_s">
          <p className="p60 txt_white w-700">
            Latest <span className="txt_primary">Clips</span>
          </p>
          <FilterCategory
            videosData={videosData}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="Listing-clips">
          <ListingLatestClips videosData={filteredVideos}></ListingLatestClips>
        </div>
      </div>
    </div>
  );
}

export default LatestClipsComponent;
