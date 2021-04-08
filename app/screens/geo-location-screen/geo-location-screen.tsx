import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import {} from "react-native-gesture-handler"
import { useState } from "react"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const WELCOME: TextStyle = {
  fontSize: 20,
  textAlign: "center",
  margin: 10,
}

export const GeoLocationScreen = observer(function GeoLocationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [location, setLocation] = useState(null)
  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("positono",position)
    })
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <TouchableOpacity onPress={findCoordinates}>
        <Text style={WELCOME}>Find My Coords?</Text>
        <Text>Location: {location}</Text>
      </TouchableOpacity>
    </Screen>
  )
})
