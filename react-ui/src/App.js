import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCustomer from "./components/add-customer";
import Customer from "./components/customer";
import CustomersList from "./components/customers-list";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand">{ /* href="/" */ }
              Malindo Air
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Create Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link"> {/* to={"/customers"} */}   
                  Show Customers
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/customers"]} component={CustomersList} />
              <Route exact path="/add" component={AddCustomer} />
              <Route path="/customers/:id" component={Customer} />
              <Route path="/add/:id" component={AddCustomer} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
