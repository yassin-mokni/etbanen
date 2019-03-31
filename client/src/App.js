import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import MealsList from "./components/MealsList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import MealModal from "./components/MealModal";
import { Container } from "reactstrap";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Container>
            <MealModal></MealModal>
            <MealsList></MealsList>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
