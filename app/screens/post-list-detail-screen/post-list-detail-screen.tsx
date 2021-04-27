import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const VALUE: TextStyle = {
  color: color.palette.black,

}

const CONTAINER: ViewStyle = {
  padding: 5,
  borderBottomWidth: 1,
  borderBottomColor: color.palette.lightGrey,
  marginTop:10
}
export interface PostListDetail{
  title?: string;
  url?: string;
  created_at?: Date;
  // author?:string
}
export const PostListDetailScreen = observer(function PostListDetailScreen() {
  const { postListStore } = useStores()
  const { postDetail } = postListStore

  const renderItem = (label: string, value: PostListDetail) => {
    return (
      <>
        {postDetail ? (
          <View style={CONTAINER}>
            <Text text={label + " : " + value} style={VALUE}/>
          </View>
        ) : null}
      </>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      {/* <Header leftIcon={"back"} headerText={"Post List Detail"} /> */}
      <>
        {renderItem("Title", postDetail.title)}
        {renderItem("Url", postDetail.url)}
        {renderItem("Created_at", postDetail.created_at)}
         {renderItem("author",postDetail.author)}
      </>
    </Screen>
  )
})
