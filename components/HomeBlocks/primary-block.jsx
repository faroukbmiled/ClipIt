import Joystick from "../../src/assets/imgs/joy_stick.png";
function PrimaryBlock() {
  return (
    <div id="PrimaryBlock">
      <div className="wrapper">
        <div className="fl_col gp10">
          <p className="p20 w-700 txt_primary">Gaming Memories</p>
          <p className="p50 txt_white ">Share Your Gaming Clips</p>
          <p className="p16 txt_white ">
            - Clip it is a platform where gamers can share and explore thrilling
            gaming moments.
            <br />
            - Capture your best plays, upload them, and connect with a vibrant
            gaming community.
            <br />
            - Dive into a world of epic wins, funny fails, and memorable
            experiences.
            <br />- Join Clip it today and showcase your gaming prowess!
          </p>
        </div>
        <div className="joystick">
          <img src={Joystick.src} alt="" />
        </div>
      </div>
    </div>
  );
}

export default PrimaryBlock;
