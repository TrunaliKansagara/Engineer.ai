import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList, TextStyle, View, TouchableOpacity, ActivityIndicator } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TITLE: TextStyle = {
  color: color.palette.black,
}
const SEPERATE: ViewStyle = {
  backgroundColor: color.palette.white,
  borderBottomWidth: 1,
  borderTopWidth: 1,
  padding: 5,
}

const LISTCONTAINER: ViewStyle = {
  padding: 10,
  backgroundColor: color.palette.offWhite,
}

export const PostListScreen = observer(function PostListScreen() {
  
  const { postListStore } = useStores()
  const navigation=useNavigation()
  const { posts, getPosts, getLoadMorePost, updatePostDetail } = postListStore

  useEffect(() => {
    getPosts()
    const interval = setInterval(() => {
      getLoadMorePost()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const renderList = (item, index) => {
    return (
      <TouchableOpacity
        style={LISTCONTAINER}
        onPress={() => {
          onItemPress(item)
        }}
      >
        <Text text={index + " " + item.title} style={TITLE} />
        <Text text={item.url} style={[TITLE, { marginTop: 10 }]} />
        <Text text={item.author} style={[TITLE, { marginTop: 10 }]} />
      </TouchableOpacity>
    )
  }

  const onItemPress = (item: any) => {
    updatePostDetail(item)
    navigation.navigate("postListDetail")
  }

  const emptyComponent = () => {
    return <Text text={"No data available"} style={TITLE} />
  }

  const onEndReached = () => {
    if (!postListStore.isLoading) {
      getLoadMorePost()
    }
  }

  const separate = () => {
    return <View style={SEPERATE} />
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <FlatList
        data={posts}
        renderItem={({ item, index }) => renderList(item, index)}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={separate}
        ListFooterComponent={
                 <ActivityIndicator color={color.palette.angry} /> 
                }
      />
    </Screen>
  )
})
