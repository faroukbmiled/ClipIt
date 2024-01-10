import { useEffect, useState } from "react";
import LazyImage from "../image";
import axios from "axios";
import { ResponsiveHoneycomb, Hexagon } from "react-honeycomb";
import Link from "next/link";
const sideLength = 80;
const amountOfUsers = 82;

function LatestUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/user/getLatestUsers?take=${amountOfUsers}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching latest users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="LatestUsersList">
      <div className="wrapper fl_col gp50">
        <p className="p60 txt_white w-700">
          Latest <span className="txt_primary">Registered </span>Users
        </p>
        <ResponsiveHoneycomb
          size={sideLength}
          items={users}
          renderItem={(user) => (
            <Hexagon key={user?.id}>
              <Link href={`/user/${user?.id}`}>
              {/* <LazyImage src={{ src: user?.avatar }} width={600} height={600} /> */}
              <LazyImage src={user?.avatar} className="lazy_img"/>

              </Link>
            </Hexagon>
          )}
        />
      </div>
    </div>
  );
}

export default LatestUsersList;
