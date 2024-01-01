import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import HeaderProfile from "./header-profile";
import ListingVideosProfile from "./listing-videos-profile";
import { useSession, signOut } from "next-auth/react";
import Header from "../../../components/header/header";
const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  // return (
  //   <div>
  //     <pre>{JSON.stringify(userData, null, 2)}</pre>
  //   </div>
  // );

  return (
    <div id="page-content" className="UserProfile-Page">
        <div className="pd40" id="header">
            <Header session={session} status={status} signOut={signOut}></Header>
        </div>
        <div id="body">
          
            <HeaderProfile></HeaderProfile>
            <ListingVideosProfile></ListingVideosProfile>
        </div>
        <div id="footer">
        {/* <pre style={{backgroundColor: "white"}}>{JSON.stringify(userData, null, 2)}</pre> */}
        </div>
    </div>
);
};

export default UserProfile;
