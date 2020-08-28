import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { logOutUser } from "../../actions/loginAction";
import { getUserInfo } from "../../actions/userAction";

const HomeScreen = (props) => {
  // console.log("props.user >>", props.users);

  useEffect(() => {
    props.getUserInfo(window.localStorage.getItem("user_id"));
  }, []);

  if (props.login.status === "logOut") return <Redirect to="/login" />;
  return (
    <div className="container--center">
      <h2> DashBoard </h2>
      <Link to="/projects">
        <Button variant="primary" block>
          Projects
        </Button>
      </Link>

      {/* <Link to="/tasks">
        <Button variant="primary" block>
          Tasks
        </Button>
      </Link> */}
      {window.localStorage.getItem("role") === "admin" && (
        <Link to="/users">
          <Button variant="primary" block>
            Users
          </Button>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

export default connect(mapStateToProps, { logOutUser, getUserInfo })(
  HomeScreen
);
