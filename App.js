import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {PaperProvider} from "react-native-paper";
import MyMap from "./screens/MyMap";

export default function App() {
    return (
        <PaperProvider>
            <MyMap></MyMap>
        </PaperProvider>
    );
}
