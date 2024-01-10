import EditImageIcon from "@assets/icons/EditImageIcon.svg";
import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { getCode, getNames, overwrite } from "country-list";
overwrite([
  {
    code: "IL",
    name: "bombraeil",
  },
]);

function UserInfo({ session, status, update }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setSelectedCountry({
        value: session?.user?.country ? getCode(session?.user?.country) : "TN",
        label: session?.user?.country || "Tunisia",
      });
      setUsername(session?.user?.name);
      setEmail(session?.user?.email);
    }
  }, [session]);

  const countryOptions = {
    options: Object.keys(getNames()).map((code) => ({
      value: code,
      label: getNames()[code],
    })),
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("country", selectedCountry?.label || "");

    if (coverFile) {
      formData.append("cover", coverFile);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put("/api/user/editProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { name, email, image, cover, country } = response.data.user;
      update({
        ...session,
        user: {
          ...session?.user,
          name,
          email,
          image,
          cover,
          country,
        },
      });

      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div id="UserInfo" className="rd12">
      <form action="">
        <div className="UserInfo-wrapper">
          <div className="UserInfo-header fl_row jc_s">
            <p className="p20">General info</p>
            <button
              type="button"
              onClick={(e) => handleFormSubmit(e)}
              className="btn btn-primary"
            >
              Save Settings
            </button>
          </div>
          <div className="UserInfo-content">
            <div className="media-user fl_col gp40 pd40-t-b">
              <div className="media-user-wrapper fl_row jc_s gp20">
                <div className="fl_col gp20 fl-1">
                  <p className="p18">Media</p>
                  <div className="fl_row gp20">
                    <div className="avatar-user fl_row jc_s">
                      <div className="fl_col gp10">
                        <p className="p14">Avatar</p>
                        <div className="data-upload">
                          <img
                            className="img-edit"
                            src={EditImageIcon.src}
                            alt=""
                          />
                          <img
                            className="data-img rd10"
                            src={session?.user?.image}
                            alt=""
                          />
                          <input type="file" onChange={handleImageChange} />
                        </div>
                      </div>
                    </div>
                    <div className="cover-user fl_col gp10">
                      <p className="p14">Cover photo</p>
                      <div className="data-upload">
                        <img
                          className="img-edit"
                          src={EditImageIcon.src}
                          alt=""
                        />
                        <img
                          className="data-img rd10"
                          src={session?.user?.cover}
                          alt=""
                        />
                        <input type="file" onChange={handleCoverChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="edit-bio inp_col fl_col fl-1 light-input fl_col gp20 jc_s">
                  <p className="p18">Bio</p>
                  <textarea id="bio"
                    type="text"
                    onChange={(e) => setBio(e.target.value)}
                    value={session?.user?.bio} cols="30" rows="10">
                  </textarea>
                </div>
              </div>
              <div className="user-fields light-input fl_col gp10">
                <div className="inp-row gp20">
                  <div className="inp_col fl_col fl-1">
                    <label className="txt_white" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      type="username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={session?.user?.name}
                    />
                  </div>
                  <div className="inp_col fl_col fl-1">
                    <label className="txt_white" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={session?.user?.email}
                    />
                  </div>
                </div>
                <div className="inp-row gp20">
                  <div className="inp_col fl_col fl-1">
                    <label className="txt_white" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*****************"
                    />
                  </div>
                  <div className="inp_col fl_col fl-1">
                    <label className="txt_white" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="*****************"
                    />
                  </div>
                </div>
                <div className="country-select fl_col gp5">
                  <label className="txt_white" htmlFor="country">
                    Select your country
                  </label>
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



