import React, { Component, Dropdown,  DropdownButton} from "react";
import { Navigate} from "react-router-dom";
import AuthService from "../services/auth-service";
export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Navigate: null,
      userReady: false,
      currentUser: { username: "" }

    };


  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ Navigate: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.Navigate) {
      return <Navigate to={this.state.Navigate} />
    }

    const { currentUser } = this.state;

    return (
      <div>
        {(this.state.userReady) ?
        <div>
          <h3>
           Hello: <strong>{currentUser.username}</strong>
          </h3>
      </div>: null}



      </div>
    );
  }
}