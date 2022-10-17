import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screen/Home";
import Mail from "../screen/Mail";
import Profile from "../screen/Profile";
import Instruction from "../screen/Instruction";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Pledge from "../screen/Pledge";
import { Image, Text, Platform } from "react-native";
import PasswordChange from "../screen/PasswordChange";
import Login from "../screen/Login";
import Registration from "../screen/Registration";
import PasswordRecovery from "../screen/PasswordRecovery";
import Pay from "../screen/Pay";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Profil = createStackNavigator();
const LoginNav = createStackNavigator();

const HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
			<Stack.Screen
				name="myPledgeTickets"
				component={Home}
				options={{
					title: "Мои залоговые билеты",
					headerTitleStyle: {
						color: "#fff",
						fontSize: Platform.isPad ? 18 : 14,
						fontFamily: "Roboto_400Regular",
					},
					headerStyle: {
						backgroundColor: "#29201F",
					},
					headerLeft: () => <Image source={require("../assets/logo.png")} style={{ marginLeft: "10%" }} />,
				}}
			/>
			<Stack.Screen
				name="pledgeTicket"
				component={Pledge}
				options={{
					title: "Залоговый билет",
					headerBackTitleStyle: {
						color: "#fff",
					},
					headerBackImage: () => <AntDesign name="left" size={30} color="#fff" style={{ marginLeft: "10%" }} />,
					headerBackTitleVisible: false,
					headerTitleStyle: {
						color: "#fff",
						fontSize: Platform.isPad ? 18 : 14,
						fontFamily: "Roboto_400Regular",
					},
					headerStyle: {
						backgroundColor: "#29201F",
					},
				}}
			/>
			<Stack.Screen
				name="Pay"
				component={Pay}
				options={{
					title: "Оплата",
					headerBackTitleStyle: {
						color: "#fff",
					},
					headerBackImage: () => <AntDesign name="left" size={30} color="#fff" style={{ marginLeft: "10%" }} />,
					headerBackTitleVisible: false,
					headerTitleStyle: {
						color: "#fff",
						fontSize: Platform.isPad ? 18 : 14,
						fontFamily: "Roboto_400Regular",
					},
					headerStyle: {
						backgroundColor: "#29201F",
					},
				}}
			/>
		</Stack.Navigator>
	);
};

const ProfileStack = () => {
	return (
		<Profil.Navigator
			screenOptions={{
				headerTitleAlign: "center",
			}}
		>
			<Profil.Screen
				name="Profile"
				component={Profile}
				options={{
					title: "Мой профиль",
					headerTitleStyle: {
						color: "#fff",
						fontSize: Platform.isPad ? 18 : 14,
						fontFamily: "Roboto_400Regular",
					},
					headerStyle: {
						backgroundColor: "#29201F",
					},
					headerLeft: () => <Image source={require("../assets/logo.png")} style={{ marginLeft: "10%" }} />,
				}}
			/>
			<Profil.Screen
				name="PasswordChange"
				component={PasswordChange}
				options={{
					title: "Сменить пароль",
					headerBackTitleStyle: {
						color: "#fff",
					},
					headerBackImage: () => <AntDesign name="left" size={30} color="#fff" style={{ marginLeft: "10%" }} />,
					headerBackTitleVisible: false,
					headerTitleStyle: {
						color: "#fff",
						fontSize: Platform.isPad ? 18 : 14,
						fontFamily: "Roboto_400Regular",
					},
					headerStyle: {
						backgroundColor: "#29201F",
					},
				}}
			/>
		</Profil.Navigator>
	);
};

const LoginStack = () => {
	return (
		<NavigationContainer>
			<LoginNav.Navigator screenOptions={{ headerTitleAlign: "center" }}>
				<LoginNav.Screen
					name="Login"
					component={Login}
					options={{
						headerShown: false,
					}}
				/>
				<LoginNav.Screen
					name="Registration"
					component={Registration}
					options={{
						title: "Регистрация",
						headerBackTitleStyle: {
							color: "#fff",
						},
						headerBackImage: () => <AntDesign name="left" size={30} color="#fff" style={{ marginLeft: "10%" }} />,
						headerBackTitleVisible: false,
						headerTitleStyle: {
							color: "#fff",
							fontSize: Platform.isPad ? 18 : 14,
							fontFamily: "Roboto_400Regular",
						},
						headerStyle: {
							backgroundColor: "#29201F",
						},
					}}
				/>
				<LoginNav.Screen
					name="PasswordRecovery"
					component={PasswordRecovery}
					options={{
						title: "Восстановить пароль",
						headerBackTitleStyle: {
							color: "#fff",
						},
						headerBackImage: () => <AntDesign name="left" size={30} color="#fff" style={{ marginLeft: "10%" }} />,
						headerBackTitleVisible: false,
						headerTitleStyle: {
							color: "#fff",
							fontSize: Platform.isPad ? 18 : 14,
							fontFamily: "Roboto_400Regular",
						},
						headerStyle: {
							backgroundColor: "#29201F",
						},
					}}
				/>
			</LoginNav.Navigator>
		</NavigationContainer>
	);
};

function Navigate() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: "#29201F",
						height: 50,
						paddingBottom: 5,
						paddingTop: 5,
					},
					headerTitleStyle: {
						fontFamily: "Roboto_400Regular",
						color: "#fff",
					},
					headerStyle: {
						backgroundColor: "#29201F",
					},
					headerLeft: () => <Image source={require("../assets/logo.png")} style={{ marginLeft: "10%" }} />,
					headerTitleAlign: "center",
				}}
			>
				<Tab.Screen
					name="Home"
					component={HomeStack}
					options={{
						tabBarIcon: ({ size, focused }) => <FontAwesome name="ticket" size={size - 5} color={focused ? "#fff" : "#66605F"} />,
						tabBarLabel: ({ focused, color }) => (
							<Text
								style={{
									color: focused ? "#fff" : color,
									fontFamily: "Roboto_400Regular",
									paddingLeft: Platform.isPad ? 15 : "auto",
									fontSize: Platform.isPad ? 18 : 14,
								}}
							>
								Билеты
							</Text>
						),
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="Письмо Жёлудю"
					component={Mail}
					options={{
						tabBarIcon: ({ size, focused }) => <Entypo name="newsletter" size={size - 5} color={focused ? "#fff" : "#66605F"} />,
						tabBarLabel: ({ focused, color }) => (
							<Text
								style={{
									color: focused ? "#fff" : color,
									fontFamily: "Roboto_400Regular",
									paddingLeft: Platform.isPad ? 15 : "auto",
									fontSize: Platform.isPad ? 18 : 14,
								}}
							>
								Написать
							</Text>
						),
						headerTitle: "Отправить сообщение жёлудю",
					}}
				/>
				<Tab.Screen
					name="Инструкция"
					component={Instruction}
					options={{
						tabBarIcon: ({ size, focused }) => <AntDesign name="infocirlce" size={size - 5} color={focused ? "#fff" : "#66605F"} />,
						tabBarLabel: ({ focused, color }) => (
							<Text
								style={{
									color: focused ? "#fff" : color,
									fontFamily: "Roboto_400Regular",
									paddingLeft: Platform.isPad ? 15 : "auto",
									fontSize: Platform.isPad ? 18 : 14,
								}}
							>
								Инструкция
							</Text>
						),
					}}
				/>

				<Tab.Screen
					name="Настройки"
					component={ProfileStack}
					options={{
						tabBarIcon: ({ size, focused }) => <AntDesign name="user" size={size - 5} color={focused ? "#fff" : "#66605F"} />,
						tabBarLabel: ({ focused, color }) => (
							<Text
								style={{
									color: focused ? "#fff" : color,
									fontFamily: "Roboto_400Regular",
									paddingLeft: Platform.isPad ? 15 : "auto",
									fontSize: Platform.isPad ? 18 : 14,
								}}
							>
								Профиль
							</Text>
						),
						headerShown: false,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export { Navigate, LoginStack };
