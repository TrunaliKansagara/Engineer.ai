import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, RotateXTransform, Image } from "react-native"
import { Screen, Text, Header, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { SvgUri } from "react-native-svg"

const FULL: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  // justifyContent:"center"
}
const ROWVIEW: ViewStyle = {
  flexDirection: "row",
  marginTop: 15,
  justifyContent: "center",
  alignItems: "center",
}
const LABEL: TextStyle = {
  color: color.palette.black,
  // flex: 1,
  fontWeight: "bold",
  marginRight: 10,
}
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  paddingHorizontal: spacing[4],
}
const BUTTONSTYLE: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
  marginVertical: spacing[4],
}
const BUTTON_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 14,
}
export const CountryDetailScreen = observer(function CountryDetailScreen() {
  const { countryStore } = useStores()
  const { countryData, getWeatherDetail, isLoading, weatherData } = countryStore
  const navigation = useNavigation()

  const onWeatherDetailPress = () => {
    getWeatherDetail(countryData.capital)
  }

  const renderItem = (label: string, value: any) => {
    return (
      <View style={ROWVIEW}>
        <Text style={LABEL} text={label} />
        {countryData ? <Text style={LABEL} text={value} /> : null}
      </View>
    )
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        {/* <Header leftIcon={"back"} headerText={"country detail"} /> */}
        <View style={CONTAINER}>
          {renderItem("Capital:", countryData.capital)}
          {renderItem("Population:", countryData.population)}

          {renderItem(
            "LatLng",
            countryData.latlng && countryData.latlng[0] + "," + countryData.latlng[1],
          )}
          <View style={[ROWVIEW, {}]}>
            <Text text={"Flag"} style={LABEL} />
            <SvgUri uri={countryData.flag} height={50} width={50} />
          </View>
          <Button
            isLoading={isLoading}
            style={BUTTONSTYLE}
            text={"Weather Detail"}
            textStyle={BUTTON_TEXT}
            onPress={() => {
              onWeatherDetailPress()
            }}
          />
          {weatherData && weatherData.current ? (
            <View style={{ marginTop: 10 }}>
              <Text text={"Weather Information"} style={[LABEL, { textAlign: "center" }]} />
              {renderItem("Temperature:", weatherData.current.temperature)}
              {renderItem("Wind Speed:", weatherData.current.wind_speed)}
              {renderItem("precip:", weatherData.current.precip)}
              <Image
                source={{ uri: weatherData.current.weather_icons[0] }}
                style={{ height: 50, width: 50, alignSelf: "center", marginTop: 10 }}
                resizeMode={"contain"}
              />
            </View>
          ) : null}
        </View>
      </Screen>
    </View>
  )
})
