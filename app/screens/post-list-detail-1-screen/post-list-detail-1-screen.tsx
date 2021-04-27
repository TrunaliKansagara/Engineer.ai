import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import _ from "lodash"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}
const ROWVIEW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  padding: 5,
}
export const PostListDetail1Screen = observer(function PostListDetail1Screen() {
  // Pull in one of our MST stores
  const { postList1Store } = useStores()
  const { postListDetail } = postList1Store

  const renderItem = (label: string, value: any) => {
    return (
      <View style={ROWVIEW}>
        <Text tx={label} />
        <Text text={value} />
      </View>
    )
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        {renderItem("post.title", _.get(postListDetail,"title","-------"))}
        {renderItem("post.url", _.get(postListDetail,"url","Default"))}
      </Screen>
    </View>
  )
})
