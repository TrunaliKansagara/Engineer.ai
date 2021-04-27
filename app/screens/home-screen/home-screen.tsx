import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignSelf: "center",
}
const BUTTON: ViewStyle = {
  height: 50,
  // width:100,
  marginTop: 10,
}
const BUTTON_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
}
export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const renderView = (text: string, route: any) => {
    return (
      <Button
        style={BUTTON}
        textStyle={BUTTON_TEXT}
        tx={text}
        onPress={() => {
          navigation.navigate(route)
        }}
      />
    )
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        <View style={CONTAINER}>
          {/* {renderView("home.countryDemo", "countryInput")}
          {renderView("home.postList", "postList")}
          {renderView("home.randomAstData", "inputScreen")}
          {renderView("home.userList", "userList")}
          {renderView("home.trafficSignal", "trafficSignal")} */}
          {renderView("home.postList", "postList1")}
          {renderView("home.randomAstData", "astInput")}
        </View>
      </Screen>
    </View>
  )
})
