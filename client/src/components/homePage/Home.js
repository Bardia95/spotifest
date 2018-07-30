import React, { Component } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import LogOutButton from "../auth/LogOutButton";

import SearchBar from "./SearchBar.js";
import ListOfFestivals from "./ListOfFestivals.js"
import GetLocationButton from "./GetLocationButton.js"
import YearSelect from "./YearSelect.js"

import FestivalSelected from "./FestivalSelected";
import { connect } from "react-redux";
import SpotifyLoginButton from "../auth/SpotifyLoginButton";
import Map from "./Map.js";

class Home extends Component {
    componentDidUpdate() {
        // autoscrolls to bottom every update
        this.bottomOfList.scrollIntoView({ behaviour: "smooth" });
    }

    render() {
        return (
            <div className="Home">
                <SpotifyLoginButton />
                <LoginForm />
                <LogOutButton />
                <SignUpForm />
                <SearchBar />
                <ListOfFestivals />
                <YearSelect />
                <Map />
                {this.props.festivalSelected && <FestivalSelected />}
                <div
                    ref={el => {
                        this.bottomOfList = el;
                    }}
                />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    festivalSelected: state.user.festivalSelected
});

export default connect(
    mapStateToProps,
    null
)(Home);
