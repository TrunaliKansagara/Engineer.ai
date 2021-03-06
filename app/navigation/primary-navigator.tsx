/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
  WelcomeScreen,
  DemoScreen,
  MobxDemoScreen,
  UserListScreen,
  PostListScreen,
  PostListDetailScreen,
  InputScreen,
  InputDetailScreen,
  CountryInputScreen,
  CountryDetailScreen,
  HomeScreen,
  GeoLocationScreen,
  TraficSignalScreen,
  SettingScreen,
  PostList1Screen,
  PostListDetail1Screen,
  AsertionInputScreen,
  AstDataDetailScreen,
} from "../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  mobx: undefined
  userlist: undefined
  postList: undefined
  postListDetail: undefined
  inputScreen: undefined
  inputDetail: undefined
  countryInput: undefined
  countryDetail: undefined
  home: undefined
  geoLocation: undefined
  userList: undefined
  trafficSignal: undefined
  setting: undefined
  postList1: undefined
  postListDetail1: undefined
  astInput: undefined
  astDataDetail:undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="postList1" component={PostList1Screen} />
      <Stack.Screen name="astInput" component={AsertionInputScreen} />
      <Stack.Screen name="astDataDetail" component={AstDataDetailScreen} />
      <Stack.Screen name="postListDetail1" component={PostListDetail1Screen} />
      <Stack.Screen name="countryInput" component={CountryInputScreen} />
      <Stack.Screen name="postList" component={PostListScreen} />
      <Stack.Screen name="inputScreen" component={InputScreen} />
      <Stack.Screen name="countryDetail" component={CountryDetailScreen} />

      <Stack.Screen name="inputDetail" component={InputDetailScreen} />

      <Stack.Screen name="postListDetail" component={PostListDetailScreen} />
      <Stack.Screen name="mobx" component={MobxDemoScreen} />
      <Stack.Screen name="userlist" component={UserListScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="userList" component={UserListScreen} />
      <Stack.Screen name="trafficSignal" component={TraficSignalScreen} />
      <Stack.Screen name="setting" component={SettingScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
