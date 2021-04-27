import React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  FlatList,
  View,
  TextStyle,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { useEffect } from "react"


const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}
const TITLE: TextStyle = {
  color: color.palette.black,
  padding: 5,
}
const SEPARATE: ViewStyle = {
  borderTopWidth: 1,
  borderBottomWidth: 1,
  padding: 5,
}
const ROWVIEW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginHorizontal: 10,
}

export const PostList1Screen = observer(function PostList1Screen() {
  // Pull in one of our MST stores
  const { postList1Store } = useStores()
  const {
    fetchPostListData,
    isLoading,
    postListData,
    fetchMoreData,
    isLoadMore,
    updatePostListDetail,
  } = postList1Store
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    const getPost = async () => {
      await fetchPostListData()
    }
    getPost()

    const interval = setInterval(() => {
      fetchMoreData()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const onEndReached = () => {
    if (!isLoadMore) {
      fetchMoreData()
    }
  }

  const renderView = (label: string, value: any) => {
    return (
      <View style={ROWVIEW}>
        <Text tx={label} preset={"bold"} style={TITLE} />
        <Text text={value} style={TITLE} />
      </View>
    )
  }

  const renderList = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onItemPress(item)
        }}
        key={index}
      >
        {renderView("post.title", item.title)}
        {renderView("post.author", item.author)}
        {renderView("post.url", item.url)}
      </TouchableOpacity>
    )
  }

  const ItemSeparatorComponent = () => {
    return <View style={SEPARATE} />
  }
  const onItemPress = (item: object) => {
    updatePostListDetail(item)
    navigation.navigate("postListDetail1")
  }
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="fixed">
        <FlatList
          data={postListData}
          renderItem={({ item, index }) => renderList(item, index)}
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          ListFooterComponent={
            isLoadMore && <ActivityIndicator size={"small"} color={color.palette.angry} />
          }
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={(item, index) => index.toString()}
        />
      </Screen>
    </View>
  )
})
