import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "./Constants";

class Navbar extends Component {
  state = {
    logout: null,
    user: ""
  };

  setUser = (user) => {
    this.setState({ user });
    return this.state.user;
  }

  render(props) {
      
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">
            BCC Anagrafiche
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-item abled navbar-txt">
                  Ciao {this.props.user}
                </span>
              </li>
              <li className="nav-item">
                <Link
                  className={"nav-item col-md-2 navButton navbar-txt"}
                  to={window.defConfigurations.url_prefix + ROUTES.LOGIN}
                  onClick={() => this.props.handleLogout(this.state.logout)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      /* <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Navbar</span>
          <span class="navbar-brand mb-0 h1">
              Ciao {this.state.userState}
            </span>
          
        </div>
      </nav> */

      /* <button className="btn btn-danger col-md-1 offset-md-6">{LABELS.LOGOUT}</button>
        <Link className={`nav-link col-md-1 ml-2 navButton ${false ? "active" : ""}`} to={window.defConfigurations.url_prefix + ROUTES.REPORT}>Report</Link> */
    );
  }
}

export default Navbar;
