import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator } from "react-navigation";

import store from "./store.js";
import Main from "./components/Main";
import Lineup from "./components/Lineup";

class App extends React.Component {
    render() {
        const MainNavigator = createStackNavigator({
            Home: { screen: Main },
            Lineup: { screen: Lineup }
        });
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

// export default SimpleApp;
export default App;
