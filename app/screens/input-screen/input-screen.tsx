import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const INPUT: TextStyle = {
  borderWidth: 1,
  marginHorizontal: "10%",
  height: 50,
  padding: 10,
  color: color.palette.black,
  backgroundColor: color.transparent,
}
const RANDOMBUTTONSTYLE: ViewStyle = {
  backgroundColor: color.palette.angry,
  width: "50%",
  justifyContent: "center",
  alignSelf: "center",
  height: 40,
  borderRadius: 8,
}
const BUTTONTEXTSTYLE: TextStyle = {
  fontSize: 12,
  fontWeight: "500",
  color: color.palette.black,
}

export const InputScreen = observer(function InputScreen() {
  const navigation = useNavigation()
  const { inputStore } = useStores()
  const { id, fetchRandomID, randomData, updateID, fetchAstData, isRandomID, isSubmit } = inputStore

  const onRandomButtonPress = () => {
    fetchRandomID()
  }

  const onSubmitPress = async () => {
    await fetchAstData()
    navigation.navigate("inputDetail")
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={ROOT}>
        <TextField
          placeholder={"Enter Id"}
          inputStyle={INPUT}
          placeholderTextColor={color.palette.black}
          value={id}
          onChangeText={(value) => {
            updateID(value)
          }}
        />
        <Button
          tx={"input.randomId"}
          style={RANDOMBUTTONSTYLE}
          textStyle={BUTTONTEXTSTYLE}
          onPress={() => {
            onRandomButtonPress()
          }}
          isLoading={isRandomID}
        />
        <Button
          tx={"input.submit"}
          style={[
            RANDOMBUTTONSTYLE,
            { marginTop: 10, backgroundColor: id ? color.palette.orange : color.palette.offWhite },
          ]}
          textStyle={BUTTONTEXTSTYLE}
          onPress={() => {
            onSubmitPress()
          }}
          disabled={id ? false : true}
          isLoading={isSubmit}
        />
      </View>
    </Screen>
  )
})
