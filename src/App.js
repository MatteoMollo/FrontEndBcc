import React, { Component } from "react";
import "./App.css";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login } from "./anagrafica_components/Login";
import { USER_TYPE, ROUTES } from "./anagrafica_components/common/Constants";
import axios from "axios";
import config from "./config.json";
import dotenv from "dotenv";
import NavBar from "./anagrafica_components/common/Navbar";
import OrizzontalForm from "./anagrafica_components/orizzontalForm";
import ListaClienti from "./anagrafica_components/listaClienti";

dotenv.config();

class App extends Component {
  state = {
    userType: null,
    username: "",
    filiali: [],
    customers: [],
    tableClass: "table table-striped invisible",
    confirmClass: "alert alert-success invisible",
    isConfirmedVisible: false
  };

  UNSAFE_componentWillMount() {
    //this if handle an eventual modification of URL from the user and redirect it to the login
    if (
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "" ||
      this.props.location.pathname === window.defConfigurations.url_prefix
    ) {
      localStorage.removeItem("TOKEN");
      this.props.history.replace(
        window.defConfigurations.url_prefix + ROUTES.LOGIN
      );
    }

    for (let api in config) {
      config[api] = config[api].replace(
        "[REACT_APP_URL_JAVA]",
        window.defConfigurations.REACT_APP_URL_JAVA
      );
    }
  }

  chiusuraConfirmed = () => {
    const invisible = "table table-striped invisible";
    this.setState({ tableClass: invisible });
  }

  handleLogout = (logoutRequest) => {
    const { userType } = this.state;
    const invisible = "table table-striped invisible";
    this.setState({ tableClass: invisible });

    if (userType !== null) {
      this.setState({ userType: logoutRequest });
      this.props.history.replace(
        window.defConfigurations.url_prefix + ROUTES.LOGIN
      );
    }
  };

  setConfirmed = () => {
    this.setState({ isConfirmedVisible: !this.state.isConfirmedVisible });
  }

  componentDidMount = async () => {
    const conf = {
      headers: {
        Authorization: localStorage.getItem("TOKEN"),
      },
    };

    const { data: filiali } = await axios.get(config.apiFilialiEndpoint, conf);
    this.setState({ filiali });
  };

  getCustomers = async (filiale, nag, nome, dataNascita) => {
    const conf = {
      headers: {
        Authorization: localStorage.getItem("TOKEN"),
      },
      params: {
        branch: filiale,
        nag: nag,
        nome: nome,
        dataNascita: dataNascita
      },
    };
    const { data: customers } = await axios.get(
      config.apiClienteEndpoint,
      conf
    );
    this.setState({ customers });
    console.log(customers);
  };

  setTableVisible = () => {
    let { tableClass } = this.state;
    tableClass = "table table-striped";
    this.setState({ tableClass });
  };

  setVariazioneClienti = async (markAsEdited) => {
    const conf = {
      headers: {
        Authorization: localStorage.getItem("TOKEN"),
      },
    };

    const risposta = await axios.post(
      config.apiVerifyAnagraficaEndpoint,
      markAsEdited,
      conf
    );
    console.log(risposta);
  };

  handleLogin = (loginRequest) => {
    const headers = { "Content-Type": "application/json" };
    const conf = { headers: { ...headers } };

    let roles = [];

    axios
      .post(config.apiLoginEndpoint, loginRequest, conf)
      .then((response) => {
        roles = [...response.data.roles];
        //saving token and username in local storage to persist data for the session
        localStorage.setItem("TOKEN", response.data.accessToken);
        localStorage.setItem("USERNAME", response.data.username);

        //checking if the user logged is a simple user or an admin
        this.setState({
          roles: roles,
          username: response.data.username,
          userType:
            roles.length === 1 && roles[0].authority === USER_TYPE.USER
              ? USER_TYPE.USER
              : USER_TYPE.ADMINISTRATOR,
        });
        //checking if the user logged is a simple user or an admin
        if (roles.length === 1 && roles[0].authority === USER_TYPE.USER) {
          this.props.history.replace(
            window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
          );
        } else {
          this.props.history.replace(
            window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
          );
        }

        {
          /*else {
          this.props.history.replace(window.defConfigurations.url_prefix + ROUTES.IMPORTA_CLIENTI);
        }*/
        }
      })
      .catch((err) => console.log(err.response));
  };

  render() {
    const { filiali, customers, tableClass, isConfirmedVisible } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            path={window.defConfigurations.url_prefix + ROUTES.LOGIN}
            exact
            render={(props) => (
              <div>
                <Login {...props} handleLogin={this.handleLogin} />
              </div>
            )}
          />
          <Route
            path={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
            exact
            render={(props) => (
              <div className="sfondo">
                <NavBar
                  {...props}
                  user={localStorage.getItem("USERNAME")}
                  handleLogout={this.handleLogout}
                />
                {/* <button onClick={this.handleBranchSearch}>Ciao</button> */}
                <OrizzontalForm
                  getCustomers={this.getCustomers}
                  setTableVisible={this.setTableVisible}
                  componentDidMount={this.componentDidMount}
                  filiali={filiali}
                  isConfirmedVisible={isConfirmedVisible}
                  setConfirmed={this.setConfirmed}
                  chiusura={this.chiusuraConfirmed}
                />
                <ListaClienti
                  customers={customers}
                  tableClass={tableClass}
                  setVariazioneClienti={this.setVariazioneClienti}
                  setConfirmed={this.setConfirmed}
                />
              </div>
            )}
          />
          {/* <Redirect from="/" to={this.state.userType === USER_TYPE.USER && this.state.username !== "" ? window.defConfigurations.url_prefix + "ricerca-clienti" : this.state.username !== "" ? window.defConfigurations.url_prefix + "importa-clienti" : window.defConfigurations.url_prefix + "login"} /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
