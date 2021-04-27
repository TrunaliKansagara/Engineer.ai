import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { useEffect } from "react"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SettingScreen = observer(function SettingScreen() {
  // Pull in one of our MST stores
  const { signalStore } = useStores()
  const { updateSignalValue } = signalStore
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    updateSignalValue(8)
  }, [])
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="settingScreen" />
    </Screen>
  )
})
