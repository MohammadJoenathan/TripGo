import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import Exploration from "../screens/Exploration";
import Wishlist from "../screens/Wishlist";
import Profile from "../screens/Profile";

import DetailModal from "../components/DetailModal";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../assets/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* Bottom Tab Navigation */
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,

        tabBarStyle: {
          backgroundColor: COLORS.surface,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Exploration") iconName = "search";
          else if (route.name === "Wishlist") iconName = "star";
          else if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Exploration" component={Exploration} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

/* Stack Navigation */
export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="DetailModal" component={DetailModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}