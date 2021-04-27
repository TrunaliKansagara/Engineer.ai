import React from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ViewStyle, View, FlatList, Image, TextStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useEffect } from "react"
import { ImageStyle } from "react-native"
import { Dimensions } from "react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ROW_VIEW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  // marginHorizontal:10
}
const USER_IMAGESTYLE: ImageStyle = {
  height: 35,
  width: 35,
  borderRadius: 17.5,
}
const SEPERATEVIEW: ViewStyle = {
  height: 1,
  backgroundColor: color.palette.black,
  width: "100%",
  marginVertical: spacing[2],
}
const USER_NAME: TextStyle = {
  color: color.palette.black,
  fontSize: 14,
  marginLeft: spacing[4],
}

export const UserListScreen = observer(function UserListScreen() {
  // Pull in one of our MST stores
  const { userStore } = useStores()
  const {
    fetchUserList,
    userData,
    isLoading,
    fetchMoreUserList,
    isLoadMore,
    updateLimit,
  } = userStore
  const IsFocused = useIsFocused()
  const windowWidth = Dimensions.get("screen").width
  useEffect(() => {
    fetchUserList()
  }, [])

  useEffect(() => {
    if (IsFocused) {
      updateLimit(0)
    }
  }, [IsFocused])

  useEffect(() => {
    if (userData) {
      console.log("uerddd", userData)
    }
  }, [userData])

  const onReachEnd = () => {
    if (!isLoadMore) {
      fetchMoreUserList()
    }
  }

  const renderList = (item, index) => {
    // console.log("item", item)
    return (
      <View key={item.name} style={{ marginHorizontal: 5 }}>
        <View style={ROW_VIEW}>
          <Image source={{ uri: item.image }} style={USER_IMAGESTYLE} resizeMode={"contain"} />
          <Text text={item.name} style={USER_NAME} />
        </View>
        <View>
          {item.items && item.items.length > 0 && item.items.length % 2 === 0 ? (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}
            >
              {item.items.map((subItem, subIndex) => {
                return (
                  <Image
                    key={subIndex}
                    source={{ uri: subItem }}
                    style={{
                      height: (windowWidth - 20) / 2,
                      width: (windowWidth - 20) / 2,
                      marginVertical: 10,
                    }}
                    resizeMode={"contain"}
                  />
                )
              })}
            </View>
          ) : (
            <View style={{ marginTop: 10 }}>
              <Image
                key={index}
                source={{ uri: item.items[0] }}
                style={{
                  height: windowWidth - 20,
                  width: "100%",
                  // marginVertical: 10,
                  alignSelf: "center",
                  marginHorizontal: 20,
                }}
                resizeMode={"contain"}
              />
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}
              >
                {item.items.map((subItem, subIndex) => {
                  return (
                    <>
                      {subIndex !== 0 && item.items.length > 1 && (
                        <Image
                          key={subIndex}
                          source={{ uri: subItem }}
                          style={{
                            height: (windowWidth - 20) / 2,
                            width: (windowWidth - 20) / 2,
                            marginVertical: 10,
                          }}
                          resizeMode={"contain"}
                        />
                      )}
                    </>
                  )
                })}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }

  const FlatListItemSeparatorComponent = () => {
    return <View style={SEPERATEVIEW} />
  }
  return (
    <Screen style={ROOT} preset="scroll">
      {isLoading ? (
        <ActivityIndicator color={color.palette.black} />
      ) : (
        <View>
          <FlatList
            data={userData}
            renderItem={({ item, index }) => renderList(item, index)}
            ItemSeparatorComponent={FlatListItemSeparatorComponent}
            onEndReachedThreshold={0.1}
            onEndReached={onReachEnd}
          />
        </View>
      )}
    </Screen>
  )
})
