import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useEffect } from "react"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}
const CONTAINER: ViewStyle = {
  justifyContent: "space-between",
}
const SUBCONTAINER: ViewStyle = {
  justifyContent: "center",
  alignSelf: "center",
  alignItems: "center",
}
const AMB_TEXT: TextStyle = {
  color: color.palette.black,
  // marginTop:10
}
const AMB_CONTAINER: ViewStyle = {
  borderWidth: 1,
  padding: 10,
  marginTop: 10,
}
const START_AMB_CONTAINER: ViewStyle = {
  borderWidth: 1,
  padding: 10,
  marginTop: 10,
  backgroundColor: "green",
}
const SIGNAL: TextStyle = {
  color: color.palette.black,
  marginTop: 10,
}

export const TraficSignalScreen = observer(function TraficSignalScreen() {
  // Pull in one of our MST stores
  const { signalStore } = useStores()
  const { signal, updateSignal, currentSignal, value, updateCurrentSignal } = signalStore
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    const interval = setInterval(() => {
      updateSignal()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Screen style={ROOT} preset="scroll">
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignSelf: "center",
          borderWidth: 1,
          padding: 10,
          marginVertical: 20,
        }}
        onPress={() => {
          navigation.navigate("setting")
        }}
      >
        <Text text={"Signal"} style={{ color: color.palette.black }} />
      </TouchableOpacity>

      <View style={CONTAINER}>
        <View style={SUBCONTAINER}>
          <TouchableOpacity
            style={currentSignal === "A" ? START_AMB_CONTAINER : AMB_CONTAINER}
            onPress={() => {
              updateCurrentSignal("A")
            }}
          >
            <Text text={"AMB"} style={AMB_TEXT} />
          </TouchableOpacity>
          <TouchableOpacity style={AMB_CONTAINER}>
            <Text text={"A"} style={AMB_TEXT} />
          </TouchableOpacity>
          <Text text={currentSignal === "A" ? signal : value} style={SIGNAL} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={[
                currentSignal === "B" ? START_AMB_CONTAINER : AMB_CONTAINER,
                { marginRight: 10 },
              ]}
              onPress={() => {
                updateCurrentSignal("B")
              }}
            >
              <Text text={"AMB"} style={AMB_TEXT} />
            </TouchableOpacity>
            <TouchableOpacity style={[AMB_CONTAINER, { marginRight: 10 }]}>
              <Text text={"B"} style={AMB_TEXT} />
            </TouchableOpacity>
            <Text text={currentSignal === "B" ? signal : value} style={SIGNAL} />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text text={currentSignal === "D" ? signal : value} style={[SIGNAL]} />
            <TouchableOpacity style={[AMB_CONTAINER, { marginLeft: 10 }]}>
              <Text text={"D"} style={AMB_TEXT} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                currentSignal === "D" ? START_AMB_CONTAINER : AMB_CONTAINER,
                { marginLeft: 10 },
              ]}
              onPress={() => {
                updateCurrentSignal("D")
              }}
            >
              <Text text={"AMB"} style={AMB_TEXT} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={SUBCONTAINER}>
          <Text text={currentSignal === "C" ? signal : value} style={SIGNAL} />
          <TouchableOpacity style={AMB_CONTAINER}>
            <Text text={"C"} style={AMB_TEXT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={currentSignal === "C" ? START_AMB_CONTAINER : AMB_CONTAINER}
            onPress={() => {
              updateCurrentSignal("C")
            }}
          >
            <Text text={"AMB"} style={AMB_TEXT} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})
