import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logOutUser } from "../../actions/loginAction";
import { getUserInfo } from "../../actions/userAction";

const HomeScreen = (props) => {
  console.log("props.user >>", props.users);

  useEffect(() => {
    props.getUserInfo(window.localStorage.getItem("user_id"));
  }, []);
  
  if (props.login.status === "logOut") return <Redirect to="/login" />;
  return (
    <div>
      {props.users.user_name}
      <Button variant="primary" block onClick={() => props.logOutUser()}>
        Log Out
      </Button>
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
