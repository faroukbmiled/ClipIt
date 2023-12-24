function UserNav({ session, signOut }) {
  return (
    <div id="userNav">
      <div className="user-menu">
        <img className="user-avatar rd50" src={session?.user?.image} alt="" />
        <div className="user-list-options pd20 fl_col gp10 rd10">
          <p className="p14">My Profile</p>
          <p className="p14">Settings</p>
          <p className="p14">Top Clips</p>
          <p className="p14" onClick={() => signOut()}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
