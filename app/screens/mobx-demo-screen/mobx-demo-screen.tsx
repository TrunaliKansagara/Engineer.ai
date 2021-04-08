import React from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  SafeAreaView,
  TextInput,
} from "react-native"
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
const BUTTON_STYLE: ViewStyle = {
  borderWidth: 1,
  margin: 10,
  alignSelf: "center",
  height: 60,
  width: 100,
  justifyContent: "center",
  backgroundColor: "blue",
}

export const MobxDemoScreen = observer(function MobxDemoScreen() {
  // Pull in one of our MST stores

  const ROOT: ViewStyle = {
    flex: 1,
    backgroundColor: color.palette.white,
  }
  const TEXT_STYLE: TextStyle = {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: color.palette.black,
  }
  const LIST_STYLE: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    margin: 10,
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
    bottom: 0,
    position: "absolute",
  }
  const navigation = useNavigation()

  const { todoStore } = useStores()
  const [name, setName] = React.useState("")
  const [lastName, setUserLastName] = React.useState("")
  const [hobby, setHoby] = React.useState("")
  const [isAdd, setIsAdd] = React.useState(false)

  const removeItems = (index) => {
    todoStore.remove(index)
    // todoStore.userlist.filter((item) => item.index !== index)
  }

  const renderList = ({ item, index }) => (
    <View style={LIST_STYLE}>
      <View>
        <Text style={{ fontSize: 20, color: "black" }}>{"ID:" + index} </Text>

        <Text style={{ fontSize: 20, color: "black" }}>{"FirstName: " + item.name} </Text>
        <Text style={{ fontSize: 20, color: "black" }}>{"LastName: " + item.sname} </Text>
      </View>
      <TouchableOpacity
        // onPress={(index) => removeItems(index)}
        onPress={() => todoStore.remove(item.name)}
        style={{ height: 30, borderRadius: 5, backgroundColor: "red", justifyContent: "center" }}
      >
        <Text style={{ paddingHorizontal: 2, color: "black" }}>{"Remove"} </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <Screen style={ROOT} preset="fixed">
      <SafeAreaView style={ROOT}>
        <Text preset="header" style={[TEXT_STYLE, { margin: 10 }]}>
          {"USER LIST"}
        </Text>

        <View style={{ flex: 1, justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
          {console.log("screen-->", todoStore.userlist.length)}
          <FlatList
            data={todoStore.userlist}
            ListEmptyComponent={() => (
              <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                <Text>{"NO data found"}</Text>
              </View>
            )}
            renderItem={renderList}
            keyExtractor={(item) => item.name}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("userlist")} style={BUTTON_STYLE}>
          <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
            {" "}
            {"Add User"}{" "}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Screen>
  )
})
