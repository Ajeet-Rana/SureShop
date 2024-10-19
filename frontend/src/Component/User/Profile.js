import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/loader";
import "./Profie.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Profile({ history }) {
  const { user, isAuthenticated, loading, url } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My profile</h1>
              <img src={url} alt={user.name} />
              <Link to="/me/update">Edit profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined At</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My orders</Link>
                <Link to="/password/update">Change password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Profile;
