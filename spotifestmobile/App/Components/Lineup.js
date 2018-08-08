import React, { Component } from "react";
import {
    Text,
    View,
    ImageBackground,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActionSheetIOS,
    StatusBar
} from "react-native";

import { connect } from "react-redux";
import {
    initializeSelectedArtists,
    deselectAllArtists,
    selectAllArtists
} from "../actions/artistActions";

import { createPlaylist } from "../actions/userActions";

import Artist from "./Artist.js";

class Lineup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfSongs: 10,
            loadingMessage: ""
        };
    }
    handleDeselect = () => {
        this.props.deselectAllArtists();
    };
    handleSelect = () => {
        this.props.selectAllArtists();
    };
    showNumberOptions = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: numberOptions,
                cancelButtonIndex: numberOptions.length - 1
            },
            buttonIndex => {
                if (numberOptions[buttonIndex] !== "cancel") {
                    this.setState({
                        ...this.state,
                        numberOfSongs: numberOptions[buttonIndex]
                    });
                }
            }
        );
    };
    makePlaylist = () => {
        this.setState({...this.state, loadingMessage: "CREATING PLAYLIST"})
        this.props.createPlaylist({
            playlistTitle: this.props.festivalSelected.title,
            festival: this.props.festivalSelected,
            artistsSelected: this.props.artistsSelected,
            numberOfSongs: this.state.numberOfSongs,
            userId: this.props.userId
        });
    };
    componentWillMount() {
        this.props.initializeSelectedArtists(this.props.festivalSelected.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.festivalSelected !== this.props.festivalSelected) {
            this.props.initializeSelectedArtists(nextProps.festivalSelected.id);
        }
    }

    render() {
        let newPlaylistMessage = ""
        if (this.props.newPlaylistName) {
          newPlaylistMessage = `your playlist "${this.props.newPlaylistName}" was created!`
        }
        let buttonMessage = "CREATE PLAYLIST"
        if (this.state.loadingMessage) {
          buttonMessage = this.state.loadingMessage
        }
        const numberOfSongs = `${this.state.numberOfSongs} SONGS / ARTIST`;
        return (
            <ImageBackground
                style={styles.background}
                source={require("./festival-pic.jpg")}
            >
                <StatusBar
                    barStyle= "light-content"
                />
                <Text style={styles.text}>{this.props.festivalSelected.title}</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity>
                        <Text onPress={this.handleSelect} style={styles.button}>
                            SELECT ALL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text
                            onPress={this.handleDeselect}
                            style={styles.button}
                        >
                            DESELECT ALL
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.flatlist}
                    data={this.props.allArtists}
                    renderItem={({ item }) => <Artist artist={item} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
                <View style={styles.createContainer}>
                    {this.props.newPlaylistName ? (
                    <View>
                    <Text
                        onPress={this.showNumberOptions}
                        style={styles.createButtons}
                    >
                        {numberOfSongs}
                    </Text>
                    <Text onPress={this.makePlaylist} style={styles.createButtons}>{buttonMessage}</Text>
                    </View>
                    ):(
                    <Text style={styles.playlistCreated}>PLAYLIST CREATED</Text>)}
                </View>
            </ImageBackground>
        );
    }
}

const numberOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "cancel"
];

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    text: {
        marginTop: 50,
        marginBottom: 0,
        textAlign: "center",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    button: {
        backgroundColor: "white",
        padding: 10,
        margin: 8,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        fontSize: 12,
        overflow: "hidden"
    },
    createContainer: {
        flexDirection: "row",
        backgroundColor: "transparent"
    },
    createButtons: {
        color: "black",
        fontSize: 12,
        backgroundColor: "white",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        overflow: "hidden",
        margin: 8
    },
    playlistCreated: {
        color: "black",
        backgroundColor: "#01E365",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        overflow: "hidden",
        margin: 8,
        fontSize: 12
    }
});

const mapStateToProps = state => ({
    festivalSelected: state.user.festivalSelected,
    allArtists: state.artist.allArtists,
    userId: state.user.userId,
    artistsSelected: state.artist.artistsSelected,
    newPlaylistName: state.user.newPlaylistName
});

export default connect(
    mapStateToProps,
    {
        deselectAllArtists,
        initializeSelectedArtists,
        selectAllArtists,
        createPlaylist
    }
)(Lineup);
