import React from 'react';
import jsonData from "../data/data.json"

function MostFollowedUsersListing() {
    const { DataForTesting } = jsonData;

    return (
        <div id="MostFollowedUsersListing">
            <div className="MostFollowedUsersListing-wrapper pd24-r-l fl_col gp20">
                <div className="header-wrapper">
                    <p className="p14">Following</p>
                </div>
                <div className="body-wrapper">
                    <div className="users-listing fl_col gp15">
                        {DataForTesting.map((user, index) => (
                            <div className="card-user fl_row gp24 ai_c" key={index}>
                                <img className="rd50" src={user.user_avatar} alt={user.username} />
                                <p className="p14 txt_white">{user.username}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostFollowedUsersListing;
