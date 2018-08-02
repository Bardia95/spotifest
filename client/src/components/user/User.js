import React, { Component } from "react";
// import { connect } from "react-redux";
import TopGenres from "./TopGenres";
import TopArtists from "./TopArtists";
import Playlists from "./Playlists";



export default class User extends Component {
    render() {
        return (
            <div>
                <h2>Hello {this.props.userId}</h2>
                <TopGenres userId={this.props.userId} />
                <TopArtists userId={this.props.userId} />
                <Playlists userId={this.props.userId} />
            </div>
        );
    }
}

