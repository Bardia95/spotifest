import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { deselectArtist, selectArtist } from "../actions/artistActions";



class Artist extends Component {
    pressSelected= () => {
        this.props.deselectArtist(this.props.artist)
    }
    pressNotSelected= () => {
        this.props.selectArtist(this.props.artist)
    }

    render() {
        let isloaded = false
        if (this.props.artist) {
          if (this.props.artist.spotify_artist_info) {
            if (this.props.artist.spotify_artist_info.images[0]) {
              if (this.props.artist.spotify_artist_info.images[0].url) {
                isloaded = true
              }
            }
          }
        }
        let selectedOrNot = "selected"
        if (!this.props.artistsSelected) {
          selectedOrNot = "notSelected"
        } else if (!this.props.artistsSelected.includes(this.props.artist)) {
          selectedOrNot = "notSelected"
        }
        return (
            <View styles={styles.container}>
                {isloaded &&
                    <View>
                    {selectedOrNot === "selected" ? (
                        <TouchableOpacity onPress={this.pressSelected} style={styles.artistContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.selectedText}>{this.props.artist.artist_name}</Text>
                        </View>
                        <Image

                            source={{uri: this.props.artist.spotify_artist_info.images[0].url}}
                            style={styles.selectedArtistPhoto}
                        />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={this.pressNotSelected} style={styles.artistContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.notSelectedText}>{this.props.artist.artist_name}</Text>
                        </View>
                        <Image
                            source={{uri: this.props.artist.spotify_artist_info.images[0].url}}
                            style={styles.notSelectedArtistPhoto}
                        />
                        </TouchableOpacity>
                    )}
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    artistContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 25,
        marginRight: 25
    },
    selectedText: {
        color: "white",
        textTransform: "uppercase",
        fontSize: 10,
        textAlign: "center",
    },
    selectedArtistPhoto: {
        marginTop: 5,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: "hidden",
        borderColor: "#01E365",
        borderWidth: 2,
    },
    notSelectedText: {
        color: "gray",
        textTransform: "uppercase",
        fontSize: 10,
        textAlign: "center"
    },
    notSelectedArtistPhoto: {
        marginTop: 5,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: "hidden",
        borderColor: "gray",
        borderWidth: 2,
        opacity: 0.2
    },
    textContainer: {
        width: 100,
        alignItems: "center"
    }
});

const mapStateToProps = state => ({
    artistsSelected: state.artist.artistsSelected,
});

export default connect(
    mapStateToProps,
    { deselectArtist, selectArtist }
)(Artist);
