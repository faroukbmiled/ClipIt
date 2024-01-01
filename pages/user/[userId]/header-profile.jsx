import { useEffect, useState } from 'react';
import coverTest from "../../../src/assets/imgs/cover_test.jpg";
import FollowUser from "../../../src/assets/Icons/Follow-user.svg";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";

function HeaderProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { userId } = router.query;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log(session?.user?.id)
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
    return (
        <div id="HeaderProfile" className="pd40 w-100">
            <div className="HeaderProfile-wrapper fl_row jc_s ai_c w-100">
                <div className="user-box fl_col gp20">
                    <div className="user-cover">
                        <img src={userData.cover} alt="" />
                    </div>
                    <div className="user-info fl_row gp24 ai_c ">
                        <div className="user-avatar">
                            <img className="rd50" src={userData.avatar} alt="" />
                        </div>
                        <div className="user-details fl_col">
                            <p className="p24 txt_white w-700 cap">{userData.username}</p>
                            <p className="p14 txt_light-grey">
                                {userData.followers} Followers
                            </p>
                        </div>
                    </div>
                    <div className="user-tabs">
                        <ul className="fl_row gp50 p14 txt_light-grey">
                            <li>Videos</li>
                            <li>Followers</li>
                            <li>Following</li>
                            <li>About</li>
                        </ul>
                    </div>
                </div>
                <div className="follow-box btn btn-primary fl_row gp10 ai_c rd20">
                    <img src={FollowUser.src} alt="" />
                    <p className="p17">Follow</p>
                </div>
            </div>
        </div>
    );
}

export default HeaderProfile;
