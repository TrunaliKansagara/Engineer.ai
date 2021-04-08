import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, TextInput, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT_STYLE: TextStyle = {
  alignSelf: "center",
  fontSize: 20,
  fontWeight: "bold",
  color: color.palette.black,
}
const TextInput_style: ViewStyle = {
  borderWidth: 1,
  borderColor: "red",
  height: 40,
  width: "60%",
  margin: 10,
  alignSelf: "center",
}
const BUTTON_STYLE: ViewStyle = {
  borderWidth: 1,
  margin: 10,
  alignSelf: "center",
  // height: 60,
  // width: 100,
  height: 60,
  justifyContent: "center",
  backgroundColor: "blue",
}

export const UserListScreen = observer(function UserListScreen() {
  // Pull in one of our MST stores
  const { todoStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const [fname, setFN] = React.useState("")
  const [sname, setSN] = React.useState("")
  const OnAdd = () => {
    // navigation.navigate("mobx")
    const data = {
      fname,
      sname,
    }
    todoStore.add({ name: fname, sname: sname })
    setFN("")
    setSN("")
    console.log("data===", todoStore.userlist)
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={ROOT}>
        <Text style={TEXT_STYLE}>{"ADD NEW USER"}</Text>

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={TextInput_style}
            placeholder="First Name"
            value={fname}
            onChangeText={(fname) => setFN(fname)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={TextInput_style}
            placeholder="Second Name"
            value={sname}
            onChangeText={(sname) => setSN(sname)}
          />
        </View>
        <TouchableOpacity onPress={OnAdd} style={BUTTON_STYLE}>
          <Text style={[TEXT_STYLE, { color: "white" }]}>{"ADD USER"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("mobx")}
          style={[BUTTON_STYLE, { backgroundColor: "green" }]}
        >
          <Text style={[TEXT_STYLE, { color: "white" }]}>{"List Screen"}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
