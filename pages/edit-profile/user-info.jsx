
import EditImageIcon from "../../src/assets/Icons/EditImageIcon.svg";
import Select from "react-select";

import { useState, useEffect } from "react";
import { getCode, getNames, overwrite } from "country-list"; // Updated import
overwrite([{
    code: 'IL',
    name: 'bombraeil'
}])
function UserInfo() {

    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        setSelectedCountry({ value: "Tn", label: "Tunisia" });
    }, []);

    const countryOptions = {
        options: Object.keys(getNames()).map((code) => ({
            value: code,
            label: getNames()[code],
        })),
    };

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    return (
        <div id="UserInfo" className="rd12">
            <form action="">
                <div className="UserInfo-wrapper">
                    <div className="UserInfo-header fl_row jc_s">
                        <p className="p20">General info</p>
                        <button className="btn btn-primary">Save Settings</button>
                    </div>
                    <div className="UserInfo-content">
                        <div className="media-user fl_col gp40 pd40-t-b">
                            <div className="media-user-wrapper fl_col gp20">
                                <p className="p18">Media</p>
                                <div className="fl_row gp20">
                                    <div className="avatar-user fl_col gp10">
                                        <p className="p14">Avatar</p>
                                        <div className="data-upload">
                                            <img className="img-edit" src={EditImageIcon.src} alt="" />
                                            <img className="data-img rd10" src="https://i.pravatar.cc/100" alt="" />
                                            <input type="file" />
                                        </div>
                                    </div>
                                    <div className="cover-user fl_col gp10">
                                        <p className="p14">Cover photo</p>
                                        <div className="data-upload">
                                            <img className="img-edit" src={EditImageIcon.src} alt="" />
                                            <img className="data-img rd10" src="https://i.pravatar.cc/150" alt="" />
                                            <input type="file" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-fields light-input fl_col gp10">
                                <div className="inp-row gp20">
                                    <div className="inp_col fl_col fl-1">
                                        <label className="txt_white" htmlFor="email">Username</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="mail@clipit.com"
                                        />
                                    </div>
                                    <div className="inp_col fl_col fl-1">
                                        <label className="txt_white" htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="mail@clipit.com"
                                        />
                                    </div>
                                </div>
                                <div className="inp-row gp20">
                                    <div className="inp_col fl_col fl-1">
                                        <label className="txt_white" htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="*****************"
                                        />
                                    </div>
                                    <div className="inp_col fl_col fl-1">
                                        <label className="txt_white" htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="*****************"
                                        />
                                    </div>
                                </div>
                                <div className="country-select fl_col gp5">
                                    <label className="txt_white" htmlFor="country">Select your country</label>
                                    <Select
                                        id="country"
                                        name="country"
                                        {...countryOptions}
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserInfo;