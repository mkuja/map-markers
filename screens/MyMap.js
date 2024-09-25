import React from 'react'
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location'
import { ActivityIndicator } from 'react-native-paper';



const MyMap = () => {
    const [mapRegion, setMapRegion] = React.useState({latitude: null, longitude: null, latitudeDelta: 0.0421, longitudeDelta: 0.0922}) // [longitude, latitude]
    const [pins, setPins] = React.useState([])

    const getUserLocAndSetState = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const {longitude, latitude} = location.coords
        setMapRegion({...mapRegion, longitude, latitude})
    }

    React.useEffect(() => {
        (() => getUserLocAndSetState())()
    }, []);

    // React.useEffect(() => {
    //     console.log(`mapRegion: {longitude: ` + mapRegion.longitude + ", latitude: " + mapRegion.latitude + ", longitudeDelta: " + mapRegion.longitudeDelta + ", latitudeDelta: " + mapRegion.latitudeDelta + "}")
    // }, [mapRegion])

    const createPin = (coordinate) => {
        setPins([...pins, <Marker coordinate={coordinate}
                                        key={coordinate.latitude.toString(10) + coordinate.longitude.toString(10)}/>])
    }


    return (
        mapRegion.longitude ? <MapView style={styles.map}
                                       initialRegion={mapRegion}
                                       onRegionChange={(region) => setMapRegion(region)}
                                       onLongPress={(event) => createPin(event.nativeEvent.coordinate)}
            >
                {pins}
            </MapView>
                : <ActivityIndicator animating={true} size="large" style={styles.spinner}/>
    )
}

const styles = {
    map: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
}

export default MyMap