import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import _ from "lodash"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
}
const NAME: TextStyle = {
  color: color.palette.black,
}
const ROW: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: 10,
  flexWrap: "wrap",
  marginTop:10
}
export const AstDataDetailScreen = observer(function AstDataDetailScreen() {
  // Pull in one of our MST stores
  const { astDataStore } = useStores()
  const { astData } = astDataStore
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const randersView = (label: string, value: any) => {
    return (
      <View style={ROW}>
        <Text text={label} preset={"bold"} style={NAME} />
        <Text text={value} preset={"default"} style={NAME} />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={CONTAINER}>
        {/* <Text text={_.get(astData,"name","-----")} style={NAME} />
         */}
        {randersView("Name: ", _.get(astData, "name", "-----"))}
        {randersView("nasa_jpl_url: ", _.get(astData, "nasa_jpl_url", "------"))}
        {randersView(
          "is_potentially_hazardous_asteroid: ",
          astData && astData.is_potentially_hazardous_asteroid ? "Yes" : "No",
        )}
      </View>
    </Screen>
  )
})
