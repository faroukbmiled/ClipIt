import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveHoneycomb, Hexagon } from "react-honeycomb";

const sideLength = 88;
const amountOfUsers = 50;

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
          defaultWidth={1024}
          size={sideLength}
          items={users}
          renderItem={(user) => (
            <Hexagon key={user.id}>
              <img
                onClick={() => {
                  location.href = "user/" + user.id;
                }}
                src={user.avatar}
              />
              <p>{user.username}</p>
              <p>Followers: {user.followersCount}</p>
            </Hexagon>
          )}
        />
      </div>
    </div>
  );
}

export default LatestUsersList;
