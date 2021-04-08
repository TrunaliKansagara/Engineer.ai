import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"
import _ from "lodash"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 10,
  // backgroundColor: color.palette.orange,
}
const TEXTSTYLE: TextStyle = {
  color: color.palette.black,
}

export const InputDetailScreen = observer(function InputDetailScreen() {
  const { inputStore } = useStores()
  const { astData } = inputStore

  const renderItem = (label: string, value: any) => {
    return (
      <View style={CONTAINER}>
        <Text style={[TEXTSTYLE, {}]}>
          {label}
          {/* {astData ? ( */}
          <Text style={[TEXTSTYLE, { color: color.palette.orange }]}>{value}</Text>
        </Text>
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      {/* <Header leftIcon={"back"} headerText={"Input Detail Screen"} /> */}
      <View style={{ paddingHorizontal: 20 }}>
        {renderItem("name :- ", _.get(astData, "name", "Default"))}
        {renderItem("nasa_jpl_url :- ", _.get(astData, "nasa_jpl_url", "---"))}
        {renderItem(
          "is_potentially_hazardous_asteroid :- ",
          astData && astData.is_potentially_hazardous_asteroid ? "Yes" : "No",
        )}
      </View>
    </Screen>
  )
})
