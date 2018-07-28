import React, { Component } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import LogOutButton from "../auth/LogOutButton";
import SearchBar from "./SearchBar.js";
import Map from "./Map.js"
import ListOfFestivals from "./ListOfFestivals.js"


class Home extends Component {
    render() {
        return (
          <div className="Home">
            <LoginForm />
            <LogOutButton />
            <SignUpForm />
            <SearchBar />
            <Map/>
            <ListOfFestivals/>
          </div>
        );
    }
}

export default Home;