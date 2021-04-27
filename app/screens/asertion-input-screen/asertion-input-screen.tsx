import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, Alert } from "react-native"
import { Screen, Text, TextField, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { useEffect } from "react"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER_VIEW: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  marginHorizontal: spacing[4],
}
const SUBMIT_BUTTON: ViewStyle = {
  marginHorizontal: spacing[4],
  paddingVertical: spacing[4],
}
const SUBMIT_BUTTON_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
}

export const AsertionInputScreen = observer(function AsertionInputScreen() {
  // Pull in one of our MST stores
  const { astDataStore } = useStores()

  const navigation = useNavigation()
  const { astId, updateAstId, astData, fetchAstData, isLoading, fetchRandomId,isRandomId} = astDataStore

  const onSubmitButtonPress = async () => {
    await fetchAstData()
    navigation.navigate("astDataDetail")
  }

  const onRandomIdPress = async () => {
    await fetchRandomId()
  }

 

  return (
    <View style={ROOT}>
      <Screen style={ROOT} preset="scroll">
        <View style={CONTAINER_VIEW}>
          <TextField
            value={astId}
            onChangeText={(value) => {
              updateAstId(value)
            }}
            placeholderTx={"input.enterAstID"}
          />
          <Button
            tx={"input.submit"}
            style={[
              SUBMIT_BUTTON,
              { backgroundColor: astId ? color.primary : color.palette.lightGrey },
            ]}
            textStyle={SUBMIT_BUTTON_TEXT}
            onPress={() => {
              onSubmitButtonPress()
            }}
            disabled={astId ? false : true}
            isLoading={isLoading}
          />
          <Button
            tx={"input.randomId"}
            style={[SUBMIT_BUTTON, { backgroundColor: color.palette.angry, marginTop: spacing[2] }]}
            textStyle={SUBMIT_BUTTON_TEXT}
            onPress={() => {
              onRandomIdPress()
            }}
            isLoading={isRandomId}
          />
        </View>
      </Screen>
    </View>
  )
})
