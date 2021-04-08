import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, Alert } from "react-native"
import { Screen, Text, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const FULL: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}
const ROOT: ViewStyle = {
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  flex: 1,
  backgroundColor: color.palette.white,
}
const BUTTONSTYLE: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
  backgroundColor: color.palette.orangeDarker,
  marginVertical: spacing[2],
}
const BUTTON_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
}

export const CountryInputScreen = observer(function CountryInputScreen() {
  // Pull in one of our MST stores
  const { countryStore } = useStores()
  const navigation=useNavigation()
  const { countryName, getCountryDetail, updateCountry, isLoading ,countryData,clearWeatherDetail} = countryStore
  const onSubmitPress = () => {
    getCountryDetail()
    clearWeatherDetail()
  }

  useEffect(() => {
    // if (isLoading) {
    if (countryData) {
        console.log("countyData",countryData)
       navigation.navigate("countryDetail")
      } else {
        Alert.alert("No data found")
        console.log("no data found")
     }
  //  }
  },[countryData])
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        <TextField
          value={countryName}
          onChangeText={(value) => {
            updateCountry(value)
          }}
          placeholderTx={"country.enterCountry"}
          placeholderTextColor={color.palette.black}
        />
        <Button
          disabled={countryName?false:true}
          style={[BUTTONSTYLE,{backgroundColor:countryName?color.primary:color.palette.lightGrey}]}
          tx={"country.submit"}
          textStyle={BUTTON_TEXT}
          isLoading={isLoading}
          onPress={() => {
            onSubmitPress()
          }}
        
        />
      </Screen>
    </View>
  )
})
